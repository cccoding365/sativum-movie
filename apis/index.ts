import request from '@/apis/request';
import * as types from '@/types';

export const getMovies = (filter : types.TMovieFilter, page : number) => {
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

interface ISearchMoviesReqOption {
	query : string;
	page : number;
}

export const searchMovies = ({ query, page } : ISearchMoviesReqOption) => {
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