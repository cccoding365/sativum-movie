<template>
	<view v-if="movieDetail" class="page-container">
		<view class="backdrop">
			<image class="image" :src="configs.IMAGE_URL.large + movieDetail.backdrop_path" mode="aspectFit" />
		</view>
		<view class="title">
			{{ movieDetail.title }}
		</view>
		<view class="tagline">
			{{ movieDetail.tagline }}
		</view>
		<view class="runtime-vote-average">
			<uni-icons class="icon" type="loop" size="30" />
			<text class="runtime"> {{ movieDetail.runtime }} minutes </text>
			<uni-icons class="icon" type="star-filled" size="30" />
			<text class="vote-average">{{ movieDetail.vote_average.toFixed(1) }}</text>
		</view>
		<view class="release-date">
			<view class="label"> 上映日期 </view>
			<text>{{ movieDetail.release_date }}</text>
		</view>
		<view class="genres">
			<view class="label"> 类型 </view>
			<text class="genre" v-for="item in movieDetail.genres" :key="item.id">{{ item.name }}</text>
		</view>
		<view class="overview">
			<view class="label"> 简介 </view>
			<text class="content" :class="{fold}" @tap="onToggleUnfold"> {{ movieDetail.overview }} </text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import configs from '@/configs';
	import apis from '@/apis';
	import types from '@/types';

	const movieDetail = ref<types.MovieDetail>();

	onLoad(async params => {
		uni.showLoading();
		movieDetail.value = await apis.getMovie(params.id) as types.MovieDetail;
		uni.hideLoading();
		uni.setNavigationBarTitle({
			title: movieDetail.value.title
		});
	});

	const fold = ref<boolean>(true);
	const onToggleUnfold = () => {
		fold.value = !fold.value;
	};
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 0 20rpx;

		.backdrop {
			margin: 0 -20rpx;
			height: 420rpx;

			.image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			font-size: 40rpx;
			line-height: 2;
		}

		.tagline {
			font-size: 30rpx;
			color: #666;
		}

		.runtime-vote-average {
			display: flex;
			align-items: center;
			margin: 10rpx 0;

			.icon {
				margin-right: 10rpx;
			}

			.runtime {
				margin-right: 30rpx;
			}
		}

		.label {
			font-size: 36rpx;
			margin-bottom: 10rpx;
			text-transform: capitalize;
		}

		.overview {
			font-size: 28rpx;
			position: relative;

			.content {
				&.fold {
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 5;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>