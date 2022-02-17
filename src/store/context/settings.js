import { createContext, useReducer } from "react";

const SettingsContext = createContext({
	settings: {
		notification: {
			show: false,
			message: "",
			title: "",
			delay: null,
			type: ""
		},
		modal: {
			newPlanet: false,
		}
	},
	updateSettings: () => { },
});

export const SettingsProvider = ({ children, reducer, initialState }) => {
	const [settingsGlobal, settingsDispatch] = useReducer(reducer, initialState);

	const updateSettings = (type, payload) => {
		settingsDispatch({ type, payload });
	};

	return <SettingsContext.Provider value={{ settings: settingsGlobal, updateSettings }}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
