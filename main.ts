import { createSSRApp } from 'vue';
import App from '@/App';

export const createApp = () => {
	const app = createSSRApp(App);
	return {
		app
	};
};