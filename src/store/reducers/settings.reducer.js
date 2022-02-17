import PropTypes from 'prop-types';

export const UPDATE_SETTINGS = "APP/SETTINGS/UPDATE";

export const initialSettingsState = sessionStorage.getItem("settings")
	? JSON.parse(sessionStorage.settings)
	: {
		notification: {
			show: false,
			message: "",
			title: "",
			delay: null,
			type: "",
		},
		modal: {
			newPlanet: false,
		}
	};


const settingsReducer = (state = initialSettingsState, action) => {
	switch (action.type) {
		case UPDATE_SETTINGS:
			sessionStorage.setItem("settings", JSON.stringify({ ...state, ...action.payload }));
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

settingsReducer.propTypes = {
	state: PropTypes.object,
	action: PropTypes.object,
};

export default settingsReducer;