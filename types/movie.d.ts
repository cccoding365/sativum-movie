export interface MovieItem {
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

export interface MovieGenre {
	id : number;
	name : string;
}

export interface Collection {
	backdrop_path : string;
	id : number;
	name : string;
	poster_path : string;
}

export interface ProductionCompany {
	id : number;
	logo_path : string;
	name : string;
	origin_country : string;
}

export interface ProductionCountry {
	iso_3166_1 : string;
	name : string;
}

export interface SpokenLanguage {
	english_name : string;
	iso_639_1 : string;
	name : string;
}

export interface MovieDetail {
	adult : boolean;
	backdrop_path : string;
	belongs_to_collection : Collection;
	budget : number;
	genres : MovieGenre[];
	homepage : string;
	id : number;
	imdb_id : string;
	original_language : string;
	original_title : string;
	overview : string;
	popularity : number;
	poster_path : string;
	production_companies : ProductionCompany[];
	production_countries : ProductionCountry[];
	release_date : string;
	revenue : number;
	runtime : number;
	spoken_languages : SpokenLanguage[];
	status : string;
	tagline : string;
	title : string;
	video : boolean;
	vote_average : number;
	vote_count : number;
}

export interface MovieList {
	page : number;
	results : MovieItem[];
	total_pages : number;
	total_results : number;
}

export type MovieFilter = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export interface MovieCast {
	adult : boolean;
	cast_id : number;
	character : string;
	credit_id : string;
	gender : number;
	id : number;
	known_for_department : string;
	name : string;
	order : number;
	original_name : string;
	popularity : number;
	profile_path : string;
}

export interface MovieCredits {
	cast : MovieCast[];
	crew : any[];
	id : number;
}