import PropTypes from 'prop-types';

export const UPDATE_GALAXY = "APP/GALAXY/UPDATE";
export const ADD_PLANET = "APP/GALAXY/ADD_PLANET";
export const ADD_RESIDENT = "APP/GALAXY/ADD_RESIDENT";
export const CLEAR_RESIDENTS = "APP/GALAXY/CLEAR_RESIDENTS";
export const ADD_FILM = "APP/GALAXY/ADD_FILM";
export const CLEAR_FILMS = "APP/GALAXY/CLEAR_FILMS";
export const UPDATE_CONTROLLERS = "APP/GALAXY/UPDATE_CONTROLLERS";
export const UPDATE_PAGINATION = "APP/GALAXY/UPDATE_PAGINATION";
export const INTRO_END = "APP/GALAXY/INTRO_END";

export const initialGalaxyState = sessionStorage.getItem("galaxy")
	? JSON.parse(sessionStorage.galaxy)
	: {
		planets: [],
		controllers: {},
		intro: true,
		films: [],
		residents: []
	};


const galaxyReducer = (state = initialGalaxyState, action) => {
	switch (action.type) {
		case UPDATE_GALAXY:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, ...action.payload }));
			return {
				...state,
				...action.payload,
			};

		case ADD_PLANET:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, planets: [...state.planets, action.payload] }));
			return {
				...state,
				planets: [...state.planets, action.payload],
			};

		case ADD_RESIDENT:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, residents: [...state.residents, action.payload] }));
			return {
				...state,
				residents: [...state.residents, action.payload]
			};

		case CLEAR_RESIDENTS:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, residents: [] }));
			return {
				...state,
				residents: []
			};

		case ADD_FILM:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, films: [...state.films, action.payload] }));
			return {
				...state,
				films: [...state.films, action.payload]
			};

		case CLEAR_FILMS:
			sessionStorage.setItem("galaxy", JSON.stringify({ ...state, films: [] }));
			return {
				...state,
				films: []
			};

		case UPDATE_CONTROLLERS:
			return {
				...state,
				controllers: { ...state.controllers, ...action.payload },
			};

		case UPDATE_PAGINATION:
			return {
				...state,
				pagination: { ...state.pagination, ...action.payload },
			};

		case INTRO_END:
			return {
				...state,
				intro: false,
			};

		default:
			return state;
	}
};

galaxyReducer.propTypes = {
	state: PropTypes.object,
	action: PropTypes.object,
};

export default galaxyReducer;