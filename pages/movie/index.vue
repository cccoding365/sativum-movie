<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import configs from '@/configs';
	import apis from '@/apis';
	import types from '@/types';
	const movieList = ref<types.MovieList>({
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0
	});

	const loadMoreStatus = ref<types.LoadMoreStatus>('more');
	const fetchMovieListData = async (filter : types.MovieFilter = 'top_rated', page : number = movieList.value.page + 1) => {
		loadMoreStatus.value = 'loading';
		const { page: currentPage, results, total_pages } = (await apis.getMovies(filter, page)) as types.MovieList;
		movieList.value.page = currentPage;
		movieList.value.results.push(...results);
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};

	const getMovieGenre = (id : number) => {
		const genres = uni.getStorageSync('Genres') as types.MovieGenre[];
		return genres.find(item => item.id === id).name;
	};

	onMounted(fetchMovieListData);

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};

	const refresherTriggered = ref<boolean>(false);
	const onRefresherrefresh = async () => {
		refresherTriggered.value = true;
		const { page: currentPage, results, total_pages } = (await apis.getMovies('top_rated', 1)) as types.MovieList;
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

<template>
	<uni-nav-bar statusBar color="#FFF" backgroundColor="#333" title="电影" />
	<view class="page-container">
		<scroll-view scroll-y="true" refresher-enabled :show-scrollbar="false" @refresherrefresh="onRefresherrefresh"
			:refresher-triggered="refresherTriggered" @scrolltolower="onScroll2Lower">
			<uni-list class="movie-list">
				<uni-list-item class="movie-item" v-for="item in movieList.results" :key="item.id"
					@tap="onMovieDetail(item.id)">
					<template v-slot:header>
						<view class="poster">
							<image class="image" v-if="item.poster_path" lazy-load mode="aspectFit"
								:src="configs.IMAGE_URL.medium + item.poster_path" />
						</view>
					</template>
					<template v-slot:body>
						<view class="info">
							<view class="release-date-title">
								<text class="release-date"> ({{ item.release_date.split('-')[0] }}) </text>
								<text class="title"> {{ item.title }} </text>
							</view>
							<view class="genre-list">
								<text class="genre-item" v-for="it in item.genre_ids" :key="it">
									{{ getMovieGenre(it) }}
								</text>
							</view>
							<view class="vote-average">
								<uni-rate readonly :value="(item.vote_average/2).toFixed(1)" max="5" :size="18" />
								<text> {{ item.vote_average.toFixed(1) }} </text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>

			<uni-load-more :status="loadMoreStatus" />
		</scroll-view>
	</view>
</template>

<style lang="scss" scoped>
	scroll-view {
		height: calc(100vh - 180rpx);
	}

	.movie-list {
		.movie-item {
			.poster {
				width: 160rpx;
				height: 240rpx;
				border-radius: 15rpx 0 0 15rpx;
				overflow: hidden;
				flex-shrink: 0;
				position: relative;

				.image {
					width: 100%;
					height: 100%;
				}

				&::after {
					content: 'no poster';
					position: absolute;
					inset: 0;
					color: #F4F4F4;
					font-weight: bold;
					text-align: center;
					text-transform: capitalize;
					background-color: #CCC;
					display: flex;
					align-items: center;
					z-index: -1;
				}
			}

			.info {
				color: #FFF;
				display: flex;
				flex: 1;
				flex-direction: column;
				background-color: #333;
				padding-inline-start: 30rpx;
				border-radius: 0 15rpx 15rpx 0;

				.release-date-title {
					line-height: 3;
					font-weight: bold;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					max-width: calc(100vw - 300rpx);
				}

				.genre-list {
					color: #DDD;

					.genre-item {
						padding-inline: 10rpx;
						font-size: 24rpx;
					}
				}

				.vote-average {
					display: flex;
					gap: 10rpx;
					align-items: center;
					line-height: 3;
				}
			}
		}
	}
</style>