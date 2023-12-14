<script>
	import apis from '@/apis';
	export default {
		onLaunch: async () => {
			console.log('App Launch');
			const { genres } = await apis.getMovieGenres();
			uni.setStorageSync('Genres', genres);
		},
		onShow: () => {
			console.log('App Show');
		},
		onHide: () => {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	page {
		color: #333;
	}
</style>