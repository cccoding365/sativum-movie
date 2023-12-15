<template>
	<uni-nav-bar statusBar title="蒜苗" />
	<view class="container">
		<uni-search-bar placeholder="搜索你感兴趣的电影" bgColor="#EEEEEE" @confirm="search" @cancel="onSearchCancel" />
		<view class="movie-list" :show-scrollbar="false" @refresherrefresh="onRefresherrefresh"
			:refresher-triggered="refresherTriggered" @scrolltolower="onScroll2Lower">
			<uni-grid :showBorder="false" :square="false">
				<uni-grid-item class="movie-item" v-for="item in movieList.results" :key="item.id"
					@tap="onMovieDetail(item.id)">
					<view class="poster">
						<image class="image" :src="configs.IMAGE_URL.medium + item.poster_path" mode="aspectFit"
							lazy-load />
						<view class="vote-average">
							<text> {{ item.vote_average.toFixed(1) }} </text>
						</view>
						<text class="title"> {{ item.title }} </text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<uni-load-more v-if="loadMoreStatus" :status="loadMoreStatus" />
	</view>
</template>

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

	const search = async (e : { value : string; }) => {
		loadMoreStatus.value = 'loading';
		const { page: currentPage, results, total_pages } = (await apis.searchMovies(e.value, 1)) as types.MovieList;
		movieList.value.page = currentPage;
		movieList.value.results = results;
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};

	onLoad(() => {
		search({ value: '哈哈' });
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

	const refresherTriggered = ref<boolean>(false);
	const onRefresherrefresh = async () => {
		refresherTriggered.value = true;
		const { page: currentPage, results, total_pages } = (await apis.getMovies('top_rated', 1)) as types.MovieList;
		movieList.value.page = currentPage;
		movieList.value.results = results;
		refresherTriggered.value = false;
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};

	const onMovieDetail = (id : number) => {
		uni.navigateTo({
			url: `../../views/movieDetail/index?id=${id}`
		});
	};


	const onScroll2Lower = () => {
		if (loadMoreStatus.value === 'more') {
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.movie-list {
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
					background-color: #333;
					padding: 4rpx 15rpx;
					border-radius: 0 0 0 15rpx;
				}

				.title {
					background-color: #333;
					color: #FFF;
					position: absolute;
					width: 100%;
					text-align: center;
					bottom: 5rpx;
					left: 0;
					font-size: 24rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>