<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import apis from '@/apis';
	import { ref } from 'vue';

	interface IUserInfo {
		id : number;
		username : string;
	}

	onLoad(async () => {
		userInfo.value = await apis.getAccountDetail(20710939) as IUserInfo;
	});

	const userInfo = ref<IUserInfo>({ id: 0, username: '' });
</script>

<template>
	<view class="page-container">
		<uni-card :border="false" class="user-info">
			<view class="header">
				<view class="avatar">
					<image class="image" src="../../static/avatar.png" mode="aspectFit" />
				</view>
				<view class="username-id">
					<text class="username">{{ userInfo.username }}</text>
					<text class="id">ID: {{ userInfo.id }}</text>
				</view>
			</view>
		</uni-card>
		<uni-list class="menu-list" :border="false">
			<uni-list-item v-for="i in 7" :key="i" showExtraIcon showArrow :extraIcon="{ type:'gear' }" :border="false"
				:title="`菜单 ${i}`" />
		</uni-list>
	</view>
</template>

<style lang="scss" scoped>
	.page-container {
		background: linear-gradient(to bottom, #30CC60, transparent 33.3%);
		height: 100vh;
		padding-top: calc(var(--status-bar-height) + 120rpx);
		position: relative;

		.menu-list {}

		.user-info {
			.header {
				display: flex;
				gap: 20rpx;

				.avatar {
					border-radius: 50%;
					overflow: hidden;
					width: 120rpx;
					height: 120rpx;

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.username-id {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 10rpx;

					.username {
						font-weight: bold;
						font-size: 36rpx;
					}

					.id {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
</style>