<template>
	<uni-nav-bar statusBar title="蒜苗" />
	<view class="container">
		<uni-search-bar placeholder="搜索你感兴趣的电影" bgColor="#EEEEEE" v-model="searchQuery" @confirm="search"
			@cancel="onSearchCancel" />
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

<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import configs from '@/configs';
	import apis from '@/apis';
	import types from '@/types';

	const movieList = ref<types.MovieList>({
		results: [],
		page: 1,
		total_pages: 0,
		total_results: 0
	});
	const loadMoreStatus = ref<types.LoadMoreStatus | null>(null);
	const searchQuery = ref<string>('');
	const search = async () => {
		loadMoreStatus.value = 'loading';
		const { page: currentPage, results, total_pages } = (await apis.searchMovies(searchQuery.value, movieList.value.page)) as types.MovieList;
		movieList.value.page = currentPage;
		movieList.value.results.push(...results);
		loadMoreStatus.value = currentPage === total_pages ? 'no-more' : 'more';
	};

	onLoad(() => {

	});

	const onSearchCancel = () => {
		Object.assign(movieList.value, {
			results: [],
			page: 1,
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
			movieList.value.page++;
			search();
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.movie-list {
			height: calc(100vh - 350rpx);
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