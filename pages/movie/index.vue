<template>
	<uni-nav-bar statusBar title="电影" />
	<view class="page-container">
		<scroll-view class="movie-list" scroll-y="true" @scrolltoupper="onScroll2Upper" @scrolltolower="onScroll2Lower">
			<view class="movie-item" v-for="item in movieList.results" :key="item.id" @tap="onMovieDetail(item.id)">
				<view class="poster">
					<image class="image" :src="configs.IMAGE_URL.medium + item.poster_path" mode="aspectFit" />
				</view>
				<view class="info">
					<view class="release-date-title">
						<text class="release-date"> ({{ item.release_date.split('-')[0] }}) </text>
						<text class="title"> {{ item.title }} </text>
					</view>
					<view class="genre-list">
						<text class="genre-item" v-for="it in item.genre_ids" :key="it"> {{ getMovieGenre(it) }}
						</text>
					</view>
					<view class="vote-average">
						<uni-rate readonly :value="(item.vote_average/2).toFixed(1)" max="5" :size="18" />
						<text> {{ item.vote_average.toFixed(1) }} </text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import configs from '@/configs';
	import * as apis from '@/apis';
	import * as types from '@/types';
	const movieList = ref<types.IMovieList>({
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0
	});
	const isLoading = ref<boolean>(false);
	const fetchMovieListData = async (filter : types.TMovieFilter = 'top_rated', page : number = movieList.value.page + 1) => {
		isLoading.value = true;
		const { page: currentPage, results } = (await apis.getMovies(filter, page)) as types.IMovieList;
		movieList.value.page = currentPage;
		movieList.value.results.push(...results);
		isLoading.value = false;
	};

	const getMovieGenre = (id : number) => {
		const genres = uni.getStorageSync('Genres') as types.IMovieGenre[];
		return genres.find(item => item.id === id).name;
	};

	onMounted(fetchMovieListData);

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};

	const onScroll2Upper = () => {
		console.log('onScroll2Upper');
	};

	const onScroll2Lower = () => {
		console.log('onScroll2Lower');
		if (!isLoading.value) {
			fetchMovieListData();
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 20rpx;

		.movie-list {
			height: calc(100vh - 200rpx);

			.movie-item {
				display: flex;
				gap: 20rpx;
				margin-bottom: 20rpx;

				.poster {
					width: 160rpx;
					height: 240rpx;
					border-radius: 15rpx;
					overflow: hidden;
					flex-shrink: 0;

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					display: flex;
					flex-direction: column;

					.release-date-title {
						.title {
							line-height: 2;
						}
					}

					.genre-list {
						.genre-item {
							margin-right: 10rpx;
							font-size: 24rpx;
						}
					}

					.vote-average {
						display: flex;
						align-items: center;
						line-height: 2;
					}
				}
			}
		}
	}
</style>