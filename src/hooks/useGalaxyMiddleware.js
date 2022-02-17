import { ADD_PLANET } from "../store/reducers/galaxy.reducer";
import useGalaxy from "./useGalaxy";

const UPDATE_GALAXY = "APP/GALAXY/UPDATE";
const ADD_RESIDENT = "APP/GALAXY/ADD_RESIDENT";
const ADD_FILM = "APP/GALAXY/ADD_FILM";
const UPDATE_CONTROLLERS = "APP/GALAXY/UPDATE_CONTROLLERS";
const UPDATE_PAGINATION = "APP/GALAXY/UPDATE_PAGINATION";

export default function useGalaxyMiddleware() {
    const { galaxy } = useGalaxy();

    const fetchPlanets = (nextUrl = "", galaxyDispatch) => {
        fetch(nextUrl || `https://swapi.dev/api/planets/`)
            .then(response => response.json())
            .then(data => {
                const currentPlanets = galaxy?.planets || [];
                const planets = data.results.map(planet => {
                    const parsedPlanet = { ...planet };
                    for (const key in parsedPlanet) {
                        if (!isNaN(Number(parsedPlanet[key])) && !Array.isArray(parsedPlanet[key])) {
                            parsedPlanet[key] = parseInt(parsedPlanet[key]);
                        }
                    }
                    return parsedPlanet;
                });
                galaxyDispatch({ type: UPDATE_GALAXY, payload: { planets: [...currentPlanets, ...planets] } });
                galaxyDispatch({ type: UPDATE_CONTROLLERS, payload: { residents: false } });
                galaxyDispatch({ type: UPDATE_PAGINATION, payload: { nextPlanets: data.next, countPlanets: data.count } });
            });
    };

    const fetchPlanet = (planetUrl, galaxyDispatch) => {
        return fetch(planetUrl)
            .then(response => response.json())
            .then(planet => {
                const parsedPlanet = { ...planet };
                for (const key in parsedPlanet) {
                    if (!isNaN(Number(parsedPlanet[key])) && !Array.isArray(parsedPlanet[key])) {
                        parsedPlanet[key] = parseInt(parsedPlanet[key]);
                    }
                }
                galaxyDispatch({ type: ADD_PLANET, payload: parsedPlanet });
            });
    };

    const fetchResidents = (urls, galaxyDispatch) => {
        if (typeof urls === "string") {
            return fetch(`https://swapi.dev/api/people/`)
                .then(response => response.json())
                .then(data => {
                    const currentResidents = galaxy?.residents || [];
                    galaxyDispatch({ type: UPDATE_GALAXY, payload: { residents: [...currentResidents, ...data.results] } });
                });
        }
        return urls.forEach(url => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    galaxyDispatch({ type: ADD_RESIDENT, payload: data });
                });
        });
    };

    const fetchFilms = (urls, galaxyDispatch) => {
        if (typeof urls === "string") {
            return fetch(urls || `https://swapi.dev/api/films/`)
                .then(response => response.json())
                .then(data => {
                    const currentFilms = galaxy?.films || [];
                    galaxyDispatch({ type: UPDATE_GALAXY, payload: { films: [...currentFilms, ...data.results] } });
                });
        }
        return urls.forEach(url => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    galaxyDispatch({ type: ADD_FILM, payload: data });
                });
        });
    };

    return { fetchPlanets, fetchPlanet, fetchResidents, fetchFilms };
}