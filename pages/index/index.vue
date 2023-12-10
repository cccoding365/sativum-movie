<template>
	<uni-nav-bar statusBar title="蒜苗" />
	<view class="container">
		<view class="slogan">
			Find Movies, TV series, and more...
		</view>
		<view class="search">
			<uni-easyinput prefixIcon="search" :inputBorder="false" confirmType="search" primaryColor="#30CC60"
				v-model="searchQuery" />
		</view>
		<Banner />
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import Banner from '@/components/index/Banner.vue';

	const searchQuery = ref<string>('流浪地球');

	onMounted(() => { });
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.slogan {
			font-size: 36rpx;
			line-height: 48rpx;
		}

		.search {
			margin: 20rpx 0 30rpx;
			border-radius: 999px;
			overflow: hidden;
		}
	}
</style>