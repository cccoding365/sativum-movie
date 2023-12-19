<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import configs from '@/configs';
	import types from '@/types';

	interface MovieMenu {
		id : number;
		label : string;
		value : types.MovieFilter;
		cover : string;
	}

	const movieMenus : MovieMenu[] = [
		{ id: 1, label: '热映影片', value: 'now_playing', cover: '/uZXRvElwBIDOWKuXdNIDKPx8u6T.jpg' },
		{ id: 2, label: '高分经典', value: 'top_rated', cover: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg' },
		{ id: 3, label: '即将上映', value: 'upcoming', cover: '/k1KrbaCMACQiq7EA0Yhw3bdzMv7.jpg' },
		{ id: 4, label: '最受欢迎', value: 'popular', cover: '/zIYROrkHJPYB3VTiW1L9QVgaQO.jpg' }
	];

	onLoad(() => {

	});

	const onMovieList = (filter : types.MovieFilter) => {
		uni.navigateTo({
			url: `../../views/movieList/index?filter=${filter}`,
		});
	};

	const onMovieSearch = () => {
		uni.navigateTo({
			url: `../../views/movieSearch/index`
		});
	};
</script>

<template>
	<NavigationBar>
		<view class="search-bar" @tap="onMovieSearch">
			<uni-icons class="search icon" type="search" color="#FFF" />
			<text>搜索你感兴趣的电影</text>
		</view>
	</NavigationBar>
	<view class="page-container">
		<view class="movie-menus">
			<view class="menu-item" v-for="item in movieMenus" :key="item.id">
				<uni-card isFull isShadow :border="false" padding="0" spacing="0" @tap="onMovieList(item.value)">
					<view class="menu-cover">
						<image class="image" :src="configs.IMAGE_URL.large + item.cover" mode="aspectFill" />
						<text class="title"> {{item.label}} </text>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.search-bar {
		display: flex;
		gap: $uni-gap-sm;
		color: #FFF;
	}

	.page-container {
		background: linear-gradient(to bottom, #30CC60, transparent 33.3%);
		height: 100vh;
		padding-top: calc(var(--status-bar-height) + 120rpx);
		position: relative;

		.movie-menus {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: $uni-gap-lg;
			padding: 0 $uni-gap-lg;

			.menu-item {
				width: calc(50% - 16rpx);
				position: relative;
				overflow: hidden;
				z-index: 9;
				border-radius: 8rpx;

				.menu-cover {
					height: 130rpx;

					.image {
						width: 100%;
						height: 100%;
						position: absolute;
					}

					.title {
						color: #FFF;
						width: 100%;
						text-align: center;
						font-weight: bold;
						position: absolute;
						bottom: 0;
						line-height: 2;
					}
				}
			}
		}
	}
</style>