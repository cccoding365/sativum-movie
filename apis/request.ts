import config from '@/configs';
const request = ({ url, data, method } : UniNamespace.RequestOptions) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			header: {
				Authorization: config.TOKEN
			},
			success: res => {
				resolve(res.data);
			}
		});
	});
};

uni.addInterceptor('request', {
	invoke: args => {
		args.url = config.BASE_URL + args.url;
	}
});

export default {
	GET: (url : string, data ?: string | AnyObject | ArrayBuffer) => request({ url, data, method: "GET" }),
	POST: (url : string, data ?: string | AnyObject | ArrayBuffer) => request({ url, data, method: "POST" })
};