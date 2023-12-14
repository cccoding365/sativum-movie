import request from '@/apis/request';
import types from '@/types';

export const getMovies = (filter : types.MovieFilter, page : number) => {
	return request.GET(`/movie/${filter}`, {
		language: 'zh-CN',
		page
	});
};

export const getMovieGenres = () => {
	return request.GET(`/genre/movie/list`, {
		language: 'zh-CN'
	});
};

export const searchMovies = (query : string, page : number) => {
	return request.GET(`/search/movie`, {
		language: 'zh-CN',
		query,
		page
	});
};

export const getMovie = (id : number) => {
	return request.GET(`/movie/${id}`, {
		language: 'zh-CN'
	});
};

export const getMovieCredits = (id : number) => {
	return request.GET(`/movie/${id}/credits`);
};

export const getMovieReviews = (id : number) => {
	return request.GET(`movie/${id}/reviews`);
};