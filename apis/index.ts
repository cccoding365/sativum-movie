import request from '@/apis/request';

export const getMovies = (filter : string, page : number) => {
	return request.GET(`/movie/${filter}`, {
		language: 'en-US',
		page
	});
};

interface ISearchMoviesReqOption {
	query : string;
	page : number;
}

export const searchMovies = ({ query, page } : ISearchMoviesReqOption) => {
	return request.GET(`/search/movie`, {
		language: 'en-US',
		query,
		page
	});
};

export const getMovie = (id : number) => {
	return request.GET(`/movie/${id}`, {
		language: 'en-US'
	});
};

export const getMovieCredits = (id : number) => {
	return request.GET(`/movie/${id}/credits`);
};

export const getMovieReviews = (id : number) => {
	return request.GET(`movie/${id}/reviews`);
};