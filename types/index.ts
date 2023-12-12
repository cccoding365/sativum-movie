export interface IMovieItem {
	adult : boolean;
	backdrop_path : string;
	genre_ids : number[];
	id : number;
	original_language : string;
	original_title : string;
	overview : string;
	popularity : number;
	poster_path : string;
	release_date : string;
	title : string;
	video : boolean;
	vote_average : number;
	vote_count : number;
}

export interface IMovieGenre {
	id : number;
	name : string;
}

export interface ICollection {
	backdrop_path : string;
	id : number;
	name : string;
	poster_path : string;
}

export interface IProductionCompany {
	id : number;
	logo_path : string;
	name : string;
	origin_country : string;
}

export interface IProductionCountry {
	iso_3166_1 : string;
	name : string;
}

export interface ISpokenLanguage {
	english_name : string;
	iso_639_1 : string;
	name : string;
}

export interface IMovieDetail {
	adult : boolean;
	backdrop_path : string;
	belongs_to_collection : ICollection;
	budget : number;
	genres : IMovieGenre[];
	homepage : string;
	id : number;
	imdb_id : string;
	original_language : string;
	original_title : string;
	overview : string;
	popularity : number;
	poster_path : string;
	production_companies : IProductionCompany[];
	production_countries : IProductionCountry[];
	release_date : string;
	revenue : number;
	runtime : number;
	spoken_languages : ISpokenLanguage[];
	status : string;
	tagline : string;
	title : string;
	video : boolean;
	vote_average : number;
	vote_count : number;
}

export interface IMovieList {
	page : number;
	results : IMovieItem[];
	total_pages : number;
	total_results : number;
}

export type TMovieFilter = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';