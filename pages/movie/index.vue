<template>
	<uni-nav-bar statusBar title="电影" />
	<view class="page-container">
		<scroll-view class="movie-list" :style="{height:scrollViewHeight}" scroll-y="true" refresher-enabled
			:show-scrollbar="false" @refresherrefresh="onRefresherrefresh" :refresher-triggered="refresherTriggered"
			@scrolltolower="onScroll2Lower">
			<view class="movie-item" v-for="item in movieList.results" :key="item.id" @tap="onMovieDetail(item.id)">
				<view class="poster">
					<image class="image" :src="configs.IMAGE_URL.medium + item.poster_path" mode="aspectFit"
						lazy-load />
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
			<uni-load-more :status="loadMoreStatus" />
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref } from 'vue';
	import configs from '@/configs';
	import * as apis from '@/apis';
	import * as types from '@/types';
	const movieList = ref<types.IMovieList>({
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0
	});

	type TLoadMoreStatus = 'more' | 'loading' | 'no-more';

	const loadMoreStatus = ref<TLoadMoreStatus>('more');
	const fetchMovieListData = async (filter : types.TMovieFilter = 'top_rated', page : number = movieList.value.page + 1) => {
		loadMoreStatus.value = 'loading';
		const { page: currentPage, results, total_pages } = (await apis.getMovies(filter, page)) as types.IMovieList;
		movieList.value.page = currentPage;
		movieList.value.results.push(...results);
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};

	const getMovieGenre = (id : number) => {
		const genres = uni.getStorageSync('Genres') as types.IMovieGenre[];
		return genres.find(item => item.id === id).name;
	};

	onMounted(fetchMovieListData);

	const scrollViewHeight = computed(() => {
		const { windowHeight, safeAreaInsets: { top, bottom } } = uni.getSystemInfoSync();
		console.log(uni.getSystemInfoSync());
		return (windowHeight - top - bottom) + 'px';
	});

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};

	const refresherTriggered = ref<boolean>(false);
	const onRefresherrefresh = async () => {
		refresherTriggered.value = true;
		const { page: currentPage, results, total_pages } = (await apis.getMovies('top_rated', 1)) as types.IMovieList;
		movieList.value.page = currentPage;
		movieList.value.results = results;
		refresherTriggered.value = false;
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};


	const onScroll2Lower = () => {
		if (loadMoreStatus.value === 'more') {
			fetchMovieListData();
		}
	};
</script>

<style lang="scss" scoped>
	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.page-container {
		padding: 20rpx;

		.movie-list {
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