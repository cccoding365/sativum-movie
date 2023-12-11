<template>
	<view class="movie-card">
		<image class="poster" :src="getPosterImgSrc(data.poster_path)" mode="widthFix" />
		<view class="vote"> {{ data.vote_average.toFixed(1) }} </view>
		<view class="title">{{ data.title }}</view>
		<view class="release-year">{{ renderReleaseYear(data.release_date) }}</view>
	</view>
</template>

<script lang="ts" setup>
	import configs from '@/configs';
	interface IMovieCardData {
		poster_path : string;
		title : string;
		release_date : string;
		vote_average : number;
	}
	defineProps<{
		data : IMovieCardData;
	}>();
	const getPosterImgSrc = (path : string) => configs.IMAGE_URL.medium + path;

	const renderReleaseYear = (date : string) =>
		`( ${date.split("-")[0] || "unknown"} )`;
</script>

<style lang="scss" scoped>
	.movie-card {
		box-sizing: border-box;
		width: 180rpx;
		margin-right: 20rpx;
		position: relative;

		.poster {
			width: 100%;
			border-radius: 10upx;
		}

		.vote {
			position: absolute;
			top: 0;
			right: 0;
			background-color: darkgoldenrod;
			border-radius: 0 0 0 10upx;
			font-size: 24rpx;
			padding: 5rpx 15rpx;
			color: #000;
		}

		.title {
			font-size: 24rpx;
			line-height: 40rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.release-year {
			font-size: 20rpx;
			color: #999;
		}
	}
</style>