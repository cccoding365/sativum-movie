<template>
	<uni-nav-bar statusBar title="分类" />
	<div class="container">
		<MovieContainer category="popular" />
		<MovieContainer category="top_rated" />
		<MovieContainer category="upcoming" />
	</div>
</template>

<script lang="ts" setup>
	import MovieContainer from '@/components/category/MovieContainer.vue';
</script>

<style lang="scss" scoped>
</style>