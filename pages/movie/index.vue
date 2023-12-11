<template>
	<uni-nav-bar statusBar title="电影" />
	<view class="page-container">
		<view class="movie-list">
			<view class="movie-item" v-for="item in movieList.results" :key="item.id">
				<view class="poster">
					<image class="image" :src="configs.IMAGE_URL.medium + item.poster_path" mode="aspectFit" />
				</view>
				<view class="info">
					<view>
						<text> {{ item.title }} </text>
						<text> ({{ item.release_date.split('-')[0] }}) </text>
					</view>
					<view class="genre-list">
						<text class="genre-item" v-for="it in item.genre_ids" :key="it"> {{ it }} </text>
					</view>
					<view class="vote-average">
						<uni-rate readonly :value="(item.vote_average/2).toFixed(1)" max="5" :size="18" />
						<text> {{ item.vote_average.toFixed(1) }} </text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { IMovieList, TMovieFilter } from '@/types';
	import * as apis from '@/apis';
	import configs from '@/configs';
	const movieList = ref<IMovieList>({
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0
	});
	const fetchMovieListData = async (filter : TMovieFilter = 'top_rated', page : number = 1) => {
		movieList.value = (await apis.getMovies(filter, page)) as IMovieList;
	};
	onMounted(fetchMovieListData);
</script>

<style lang="scss" scoped>
	.movie-item {
		display: flex;
		gap: 20rpx;
		margin-bottom: 20rpx;

		.poster {
			width: 160rpx;
			height: 240rpx;
			border-radius: 15rpx;
			overflow: hidden;

			.image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			.genre-list {
				.genre-item {
					margin-right: 10rpx;
				}
			}

			.vote-average {
				display: flex;
				align-items: center;
			}
		}
	}
</style>