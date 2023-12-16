<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import types from '@/types';

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
	<view class="page-container">
		<view class="search-bar" @tap="onMovieSearch">
			<uni-icons class="search icon" type="search" color="#FFF" />
			<text>搜索你感兴趣的电影</text>
		</view>
		<view class="movie-menus">
			<view class="menu-item" v-for="item in movieMenus" :key="item.id" @tap="onMovieList(item.value)">
				{{item.label}}
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.page-container {
		background: linear-gradient(to bottom, #30CC60, transparent 33.3%);
		height: 100vh;
		padding-top: calc(var(--status-bar-height) + 120rpx);
		position: relative;

		.search-bar {
			position: absolute;
			top: calc(var(--status-bar-height) + 60rpx);
			left: 20rpx;
			display: flex;
			gap: 10rpx;
			color: #FFF;
		}

		.movie-menus {
			display: flex;
			justify-content: center;
			gap: 20rpx;
			flex-wrap: wrap;
			padding: 20rpx;

			.menu-item {
				width: calc(50% - 10rpx);
				color: #FFF;
				border-radius: 15rpx;
				height: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				&:nth-child(1) {
					background-color: red;
				}

				&:nth-child(2) {
					background-color: orange;
				}

				&:nth-child(3) {
					background-color: blue;
				}

				&:nth-child(4) {
					background-color: green;
				}
			}
		}
	}
</style>