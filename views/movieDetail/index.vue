<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import configs from '@/configs';
	import apis from '@/apis';
	import types from '@/types';

	const movieDetail = ref<types.MovieDetail>();

	const movieCredits = ref<types.MovieCredits>({
		cast: [],
		crew: [],
		id: 0
	});

	onLoad(async params => {
		uni.showLoading();
		movieDetail.value = await apis.getMovie(params.id) as types.MovieDetail;
		movieCredits.value = await apis.getMovieCredits(params.id) as types.MovieCredits;
		uni.hideLoading();
		uni.setNavigationBarTitle({
			title: movieDetail.value.title
		});
	});

	const fold = ref<boolean>(true);
	const onToggleUnfold = () => {
		fold.value = !fold.value;
	};

	const onBack = () => {
		uni.navigateBack();
	};
</script>

<template>
	<NavigationBar>
		<uni-icons type="back" color="#FFF" @tap="onBack" />
	</NavigationBar>
	<view class="backdrop">
		<image class="image" v-if="movieDetail.backdrop_path" lazy-load mode="widthFix"
			:src="configs.IMAGE_URL.large + movieDetail.backdrop_path" />
	</view>
	<view class="page-container" v-if="movieDetail">
		<view class="base-info">
			<view class="poster">
				<image v-if="movieDetail.poster_path" class="image" mode="scaleToFill"
					:src="configs.IMAGE_URL.medium + movieDetail.poster_path" />
			</view>
			<view class="info">
				<text class="title ellipsis">{{ movieDetail.title }}</text>
				<text class="original-title ellipsis"> {{ movieDetail.original_title }} </text>
				<view class="vote-average flex">
					<uni-rate readonly :value="(movieDetail.vote_average/2).toFixed(1)" max="5" :size="18" />
					<text>{{ movieDetail.vote_average.toFixed(1) }}</text>
				</view>
				<text class="genres"> {{ movieDetail.genres.map(i=>i.name).join(' / ') }} </text>
				<view class="release-date-runtime">
					<text>{{ movieDetail.release_date }} / </text><text>{{ movieDetail.runtime }}分钟</text>
				</view>
				<view class="actions">
					<view class="action-item flex">
						<uni-icons type="heart" color="#666" size="20" />
						<text>想看</text>
					</view>
					<view class="action-item flex">
						<uni-icons type="star" color="#666" size="20" />
						<text>看过</text>
					</view>
				</view>
			</view>
		</view>
		<view class="more-info flex-col">
			<view class="tagline">
				{{ movieDetail.tagline }}
			</view>
			<view class="overview">
				<view class="header">
					<view class="label"> 简介 </view>
				</view>
				<text class="content" :class="{fold}" @tap="onToggleUnfold"> {{ movieDetail.overview.trim() }} </text>
			</view>
			<view class="cast">
				<view class="header">
					<text class="label"> 演职人员 </text>
					<text class="more"> 全部 {{ movieCredits.cast.length }} 人 </text>
				</view>
				<scroll-view scroll-x="true" :show-scrollbar="false">
					<view class="cast-list flex">
						<view v-for="item in movieCredits.cast" class="cast-item">
							<view class="profile">
								<image class="image" :src="configs.IMAGE_URL.medium + item.profile_path"
									mode="aspectFit" />
							</view>
							<view class="name text-center ellipsis"> {{ item.name }} </view>
							<view class="character text-center ellipsis"> {{ item.character }} </view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	scroll-view {
		white-space: nowrap;
	}

	.navigation-bar {
		position: absolute;
		z-index: 999;
		left: 20rpx;
	}

	.backdrop {
		.image {
			width: 100%;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(to top, rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.5));
			}
		}
	}

	.page-container {
		transform: translateY(-150rpx);

		.base-info {
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			display: flex;
			gap: 20rpx;
			font-size: 28rpx;
			color: #666;

			.poster {
				width: 240rpx;
				height: 360rpx;
				border-radius: 20rpx;
				overflow: hidden;
				flex-shrink: 0;

				.image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				display: flex;
				flex: 1;
				max-width: calc(100vw - 300rpx);
				flex-direction: column;
				gap: 10rpx;

				.title {
					font-weight: bold;
					font-size: 40rpx;
					line-height: 1.5;
					color: #FFF;
				}

				.original-title {
					margin-bottom: auto;
					color: #FFF;
				}

				.vote-average {
					align-items: center;
					gap: 10rpx;
				}

				.actions {
					display: flex;
					gap: 20rpx;
					text-align: center;

					.action-item {
						flex: 1;
						border: 2rpx solid #333;
						border-radius: 10rpx;
						padding: 10rpx 10rpx;
						gap: 5rpx;
						align-items: center;
						justify-content: center;
						font-weight: bold;
					}
				}
			}
		}

		.more-info {
			padding: 0 30rpx;
			gap: 20rpx;

			.tagline {
				font-size: 30rpx;
			}

			.label {
				font-size: 36rpx;
				font-weight: bold;
				line-height: 2;
				text-transform: capitalize;
			}

			.overview {
				font-size: 28rpx;
				position: relative;

				.content {
					&.fold {
						display: -webkit-box;
						overflow: hidden;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}
			}

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.more {
					font-size: 28rpx;
					color: #666;
				}
			}

			.cast {
				.cast-list {
					gap: 20rpx;
				}

				.cast-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.profile {
						overflow: hidden;
						width: 160rpx;
						height: 240rpx;
						border-radius: 15rpx;
						position: relative;

						.image {
							width: 100%;
							height: 100%;
						}

						&::after {
							content: 'no photo';
							position: absolute;
							inset: 0;
							color: #F4F4F4;
							font-weight: bold;
							text-transform: capitalize;
							background-color: #CCC;
							display: flex;
							justify-content: center;
							align-items: center;
							z-index: -1;
						}
					}

					.name,
					.character {
						width: 160rpx;
						font-size: 24rpx;
					}

					.name {
						line-height: 2;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>