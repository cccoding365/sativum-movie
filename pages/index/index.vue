<template>
	<view class="page-container">
		<view class="search-bar" @tap="onMovieSearch">
			<uni-icons class="search icon" type="search" color="#FFF" />
			<text>搜索你感兴趣的电影</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';

	onLoad(() => {

	});

	const onMovieSearch = () => {
		uni.navigateTo({
			url: `../../views/movieSearch/index`
		});
	};
</script>

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
	}
</style>