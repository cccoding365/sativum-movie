import config from '@/configs';
const request = (option : UniNamespace.RequestOptions) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.BASE_URL + option.url,
			method: option.method,
			data: option.data,
			header: {
				Authorization: config.TOKEN
			},
			success: res => {
				resolve(res.data);
			},
			fail: err => {
				reject(err);
			}
		});
	});
};

export default {
	GET: (url : string, data ?: string | AnyObject | ArrayBuffer) => request({ url, data, method: "GET" }),
	POST: (url : string, data ?: string | AnyObject | ArrayBuffer) => request({ url, data, method: "POST" })
};