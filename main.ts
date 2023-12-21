import { createSSRApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App';

// import zhCN from '@/locales/zh-CN';
// import enUS from '@/locales/en-US';

let i18nConfig = {
	locale: uni.getLocale(),
	messages: {

	}
};

const i18n = createI18n(i18nConfig);

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
		i18n
	};
}