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
	const loadMoreStatus = ref<types.LoadMoreStatus | null>(null);
	const searchQuery = ref<string>('');

	const onSearch = () => {
		const query = searchQuery.value;
		const page = ++movieList.value.page;
		handleMovieSearch(query, page);
	};

	const onHistorySearch = (query : string) => {
		searchQuery.value = query;
		onSearch();
	};

	const handleMovieSearch = (query : string, page : number) => {
		addSearchHistory(query);
		loadMoreStatus.value = 'loading';
		apis.searchMovies(query, page).then(res => {
			const lastResults = movieList.value.results;
			Object.assign(movieList.value, res);
			movieList.value.results.unshift(...lastResults);
		}).finally(() => {
			loadMoreStatus.value = movieList.value.page >= movieList.value.total_pages ? 'no-more' : 'more';
		});
	};
	const searchHistory = ref<string[]>([]);
	const addSearchHistory = (query : string) => {
		const data = new Set(searchHistory.value);
		data.add(query);
		searchHistory.value = [...data].reverse();
		uni.setStorageSync('SearchHistory', searchHistory.value);
	};

	const onDeleteHistory = () => {
		searchHistory.value = [];
		uni.removeStorageSync('SearchHistory');
	};

	onLoad(() => {
		searchHistory.value = uni.getStorageSync('SearchHistory') || [];
	});

	const onSearchCancel = () => {
		Object.assign(movieList.value, {
			results: [],
			page: 0,
			total_pages: 0,
			total_results: 0
		});
		loadMoreStatus.value = null;
	};

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};

	const onScroll2Lower = () => {
		if (loadMoreStatus.value === 'more') {
			onSearch();
		}
	};
</script>

<template>
	<view class="page-container">
		<uni-search-bar placeholder="搜索你感兴趣的电影" bgColor="#EEEEEE" v-model="searchQuery" @confirm="onSearch"
			@cancel="onSearchCancel" />
		<view v-if="!loadMoreStatus" class="search-history">
			<text v-for="item in searchHistory" class="history-item" :key="item"
				@tap="onHistorySearch(item)">{{ item }}</text>
			<view v-if="searchHistory.length" class="delete-history" @tap="onDeleteHistory">
				<uni-icons type="trash" color="#999" />
				<text>清除搜索记录</text>
			</view>
			<view v-else class="empty-history">
				<text>暂无搜索记录</text>
			</view>
		</view>
		<scroll-view class="movie-list" scroll-y="true" lower-threshold="200" :show-scrollbar="false"
			@scrolltolower="onScroll2Lower">
			<uni-grid :showBorder="false" :square="false">
				<uni-grid-item class="movie-item" v-for="item in movieList.results" :key="item.id"
					@tap="onMovieDetail(item.id)">
					<view class="poster">
						<image v-if="item.poster_path" class="image" :src="configs.IMAGE_URL.medium + item.poster_path"
							mode="aspectFit" lazy-load />
						<view class="vote-average">
							<text> {{ item.vote_average.toFixed(1) }} </text>
						</view>
						<text class="title"> {{ item.title }} </text>
					</view>
				</uni-grid-item>
			</uni-grid>
			<uni-load-more v-if="loadMoreStatus" :status="loadMoreStatus" />
		</scroll-view>
	</view>
</template>

<style lang="scss" scoped>
	.page-container {
		.search-history {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			position: relative;
			padding: 20rpx;
			color: #999;

			.history-item {
				background-color: #EEE;
				padding: 5rpx 20rpx;
				border-radius: 10rpx;
			}

			.empty-history,
			.delete-history {
				position: absolute;
				top: 100%;
				width: 100%;
				display: flex;
				justify-content: center;
				line-height: 100rpx;
				z-index: 99;
			}
		}

		.movie-list {
			height: calc(100vh - 200rpx);
			margin-top: 20rpx;

			.movie-item {
				padding-bottom: 30rpx;

				.poster {
					width: 180rpx;
					height: 270rpx;
					border-radius: 15rpx;
					overflow: hidden;
					flex-shrink: 0;
					position: relative;

					&::after {
						content: 'no poster';
						position: absolute;
						background-color: #CCC;
						z-index: -1;
						font-weight: bold;
						color: #F4F4F4;
						text-transform: capitalize;
						text-align: center;
						width: 100%;
						line-height: 270rpx;
					}

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.vote-average {
					position: absolute;
					top: 0;
					right: 0;
					color: gold;
					font-size: 24rpx;
					line-height: 1.5;
					font-weight: bold;
					background-color: #333333DD;
					padding: 0 15rpx;
					border-radius: 0 0 0 15rpx;
				}

				.title {
					background-color: #333333DD;
					color: #FFF;
					position: absolute;
					width: 100%;
					text-align: center;
					bottom: 0;
					left: 0;
					font-size: 24rpx;
					line-height: 2;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>