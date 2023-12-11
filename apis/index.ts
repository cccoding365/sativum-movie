import request from '@/apis/request';

export const getMovies = (filter : string, page : number) => {
	return request.GET(`/movie/${filter}`, {
		language: 'zh-CN',
		page
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