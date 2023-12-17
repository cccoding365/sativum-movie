<script>
	import apis from '@/apis';
	export default {
		onLaunch: async () => {
			console.log('App Launch');
			const { genres } = await apis.getMovieGenres();
			uni.setStorageSync('Genres', genres);
			const systemInfoSync = uni.getSystemInfoSync()
			const menuButton = uni.getMenuButtonBoundingClientRect()
			console.log({ systemInfoSync });
			console.log({ menuButton });
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

	.flex {
		display: flex;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.text-center {
		text-align: center;
	}

	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>