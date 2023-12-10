<template>
	<view class="now-playing">
		<swiper class="swiper" circular autoplay duration="2000" previous-margin="50" next-margin="50"
			@change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(item,idx) in nowPlayingMovieList.results" :key="idx">
				<view class="movie-card" :class="{ active:idx===current }">
					<image class="backdrop" :src="getPosterImgSrc(item.backdrop_path)" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue';
	import configs from '@/configs';
	import { IMovieList } from '@/types';
	import * as apis from '@/apis';
	const nowPlayingMovieList = ref<IMovieList>({ results: [] });

	const current = ref<number>(0);

	const onSwiperChange = (e : any) => {
		current.value = e.detail.current;
	};

	const getPosterImgSrc = (path : string) => configs.IMAGE_URL.large + path;

	const fetchNowPlayingMovies = async () => {
		nowPlayingMovieList.value = await apis.getMovies('now_playing', 1) as IMovieList;
	};

	onMounted(fetchNowPlayingMovies);
</script>

<style lang="scss" scoped>
	.swiper {
		height: 400rpx;

		.movie-card {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			border-radius: 20rpx;
			transform-origin: center;
			transform: scale(0.8);
			transition: transform 0.5s;

			&.active {
				transform: scale(1);
			}

			.backdrop {
				height: 300rpx;
			}
		}
	}
</style>