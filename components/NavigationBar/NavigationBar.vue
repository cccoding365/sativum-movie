<script lang="ts" setup>
	import { computed } from 'vue';
	const navigationBarStyles = computed(() => {
		const { top, height } = uni.getMenuButtonBoundingClientRect();
		return {
			top: top + 'px',
			height: height + 'px',
			lineHeight: height + 'px'
		};
	});
</script>

<template>
	<view class="navigation-bar" :style="navigationBarStyles">
		<slot />
	</view>
</template>

<style lang="scss" scoped>
	.navigation-bar {
		position: absolute;
		z-index: 999;
		left: 20rpx;
	}
</style>