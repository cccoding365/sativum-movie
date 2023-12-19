import request from '@/apis/request';
import types from '@/types';

export const getTvSeries = (filter : types.TvSeriesFilter, page : number) => {
	return request.GET(`/tv/${filter}`, {
		language: 'zh-CN',
		page
	});
};