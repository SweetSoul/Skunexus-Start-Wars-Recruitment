import { createContext, useReducer } from "react";
import useGalaxyMiddleware from "../../hooks/useGalaxyMiddleware";
import { CLEAR_FILMS, CLEAR_RESIDENTS, UPDATE_CONTROLLERS } from "../reducers/galaxy.reducer";

const GalaxyContext = createContext({
	galaxy: {
		planets: [],
		controllers: {},
		intro: true,
		films: [],
		residents: []
	},
	updateGalaxy: () => { },
});

export const GalaxyProvider = ({ children, reducer, initialState }) => {
	const [galaxyGlobal, galaxyDispatch] = useReducer(reducer, initialState);
	const { fetchPlanets, fetchPlanet, fetchResidents, fetchFilms } = useGalaxyMiddleware(galaxyDispatch);

	const updateGalaxy = (type, payload) => {
		if (!type) return;
		if (type === "FETCH_PLANETS" && !galaxyGlobal?.controllers?.planets) {
			galaxyDispatch({ type: UPDATE_CONTROLLERS, payload: { planets: true } });
			if (payload?.next) {
				return fetchPlanets(payload?.next, galaxyDispatch);
			}
			return fetchPlanets("", galaxyDispatch);
		}
		if (type === "FETCH_PLANET") {
			return fetchPlanet(payload, galaxyDispatch);
		}
		if (type === "FETCH_RESIDENTS") {
			galaxyDispatch({ type: CLEAR_RESIDENTS });
			fetchResidents(payload?.urls, galaxyDispatch);
			return;
		}
		if (type === "FETCH_FILMS") {
			galaxyDispatch({ type: CLEAR_FILMS });
			fetchFilms(payload?.urls || "", galaxyDispatch);
			return;
		}
		galaxyDispatch({ type, payload });
	};

	return <GalaxyContext.Provider value={{ galaxy: galaxyGlobal, updateGalaxy }}>{children}</GalaxyContext.Provider>;
};

export const GalaxyConsumer = GalaxyContext.Consumer;

export default GalaxyContext;
