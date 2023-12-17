<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import configs from '@/configs';
	import apis from '@/apis';
	import types from '@/types';
	const movieList = ref<types.MovieList>({
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0
	});

	const movieFilter = ref<types.MovieFilter>('top_rated');
	const refresherTriggered = ref<boolean>(false);
	const loadMoreStatus = ref<types.LoadMoreStatus>('more');
	const fetchMovieList = (filter : types.MovieFilter, page : number) => {
		loadMoreStatus.value = 'loading';
		apis.getMovies(filter, page).then(res => {
			const lastResults = movieList.value.results;
			Object.assign(movieList.value, res);
			if (page > 1) {
				movieList.value.results.unshift(...lastResults);
			}
		}).finally(() => {
			if (page === 1) refresherTriggered.value = false;
			loadMoreStatus.value = movieList.value.page >= movieList.value.total_pages ? 'no-more' : 'more';
		});
	};

	const getMovieGenre = (id : number) => {
		const genres = uni.getStorageSync('Genres') as types.MovieGenre[];
		return genres.find(item => item.id === id).name;
	};

	interface MovieMenu {
		id : number;
		label : string;
		value : types.MovieFilter;
	}

	const movieMenus : MovieMenu[] = [
		{ id: 1, label: '热映影片', value: 'now_playing' },
		{ id: 2, label: '高分经典', value: 'top_rated' },
		{ id: 3, label: '即将上映', value: 'upcoming' },
		{ id: 4, label: '最受欢迎', value: 'popular' }
	];

	onLoad(query => {
		movieFilter.value = query.filter;

		const pageTitle = movieMenus.find(item => item.value === query.filter).label;
		console.log(pageTitle);
		uni.setNavigationBarTitle({
			title: pageTitle
		});

		fetchMovieList(movieFilter.value, 1);
	});

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};

	const onRefresherrefresh = () => {
		const filter = movieFilter.value;
		refresherTriggered.value = true;
		fetchMovieList(filter, 1);
	};

	const onScroll2Lower = () => {
		if (loadMoreStatus.value === 'more') {
			const filter = movieFilter.value;
			const page = ++movieList.value.page;
			fetchMovieList(filter, page);
		}
	};
</script>

<template>
	<view class="page-container">
		<scroll-view scroll-y="true" refresher-enabled :show-scrollbar="false" @refresherrefresh="onRefresherrefresh"
			:refresher-triggered="refresherTriggered" @scrolltolower="onScroll2Lower">
			<uni-list class="movie-list">
				<uni-list-item v-for="item in movieList.results" class="movie-item" :border="false" :key="item.id"
					:customStyle="{padding:'10px 15px 0',backgroundColor:'#EEE'}" @tap="onMovieDetail(item.id)">
					<template v-slot:header>
						<view class="poster">
							<image class="image" v-if="item.poster_path" lazy-load mode="aspectFit"
								:src="configs.IMAGE_URL.medium + item.poster_path" />
						</view>
					</template>
					<template v-slot:body>
						<view class="info">
							<text class="title ellipsis"> {{ item.title }} </text>
							<text class="release-date"> {{ item.release_date.replaceAll('-','/') }} </text>
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
		height: calc(100vh - 0rpx);
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
				display: flex;
				flex: 1;
				flex-direction: column;
				gap: 15rpx;
				background-color: #FFF;
				padding-inline: 30rpx;
				border-radius: 0 15rpx 15rpx 0;

				.title {
					line-height: 2;
					font-weight: bold;
					max-width: calc(100vw - 280rpx);
				}

				.release-date {
					font-size: 24rpx;
					color: #999;
				}

				.genre-list {
					display: flex;
					gap: 10rpx;
					color: #FFF;

					.genre-item {
						padding: 5rpx 10rpx;
						border-radius: 5rpx;
						font-size: 24rpx;
						background-color: #00B26A;
					}
				}

				.vote-average {
					display: flex;
					gap: 10rpx;
					align-items: center;
				}
			}
		}
	}
</style>