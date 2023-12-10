<template>
	<view class="movie-container">
		<view class="header">
			<text class="title">{{ category }}</text>
			<text class="more">More</text>
			<uni-icons type="right" size="20" color="#fff" />
		</view>
		<scroll-view class="main" enable-flex scroll-x="true" scroll-y="false">
			<MovieCard v-for="item in movieList.results" :key="item.id" :data="item" />
		</scroll-view>
		<view class="footer"></view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import * as apis from '@/apis';
	import MovieCard from './MovieCard.vue';

	import { IMovieList } from '@/types';

	const props = defineProps<{
		category : string;
	}>();

	const movieList = ref<IMovieList>({ results: [] });

	const fetchMovieList = async () => {
		movieList.value = (await apis.getMovies(props.category, 1)) as IMovieList;
	};

	onMounted(fetchMovieList);
</script>

<style lang="scss" scoped>
	.movie-container {
		padding: 20rpx;

		.header {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 20rpx 0;

			.title {
				text-transform: capitalize;
				margin-right: auto;
			}
		}

		.main {
			display: flex;
		}
	}
</style>