import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = sessionStorage.getItem("galaxy")
    ? JSON.parse(sessionStorage.galaxy)
    : {
        planets: [],
        controllers: {},
        intro: true,
        films: [],
        residents: []
    };

/**
 *  I was in doubt of using RTK query since its not stated in the readme. 
 *  I used only toolkit that also is not stated in the readme but is more widely used.
 * */
const baseAPI = "https://swapi.dev/api/";
export const fetchPlanets = createAsyncThunk('galaxy/fetchPlanets', async () => {
    const response = await fetch(baseAPI + "planets/");
    const data = await response.json();
    const currentPlanets = initialState.planets || [];
    const planets = data.results.map(planet => {
        const parsedPlanet = { ...planet };
        for (const key in parsedPlanet) {
            if (!isNaN(Number(parsedPlanet[key])) && !Array.isArray(parsedPlanet[key])) {
                parsedPlanet[key] = parseInt(parsedPlanet[key]);
            }
        }
        return parsedPlanet;
    });
    return { planets: [...currentPlanets, ...planets] };
});

export const fetchPlanet = createAsyncThunk('galaxy/fetchPlanet', async (planetUrl) => {
    const response = await fetch(planetUrl);
    const planet = await response.json();
    const parsedPlanet = { ...planet };
    for (const key in parsedPlanet) {
        if (!isNaN(Number(parsedPlanet[key])) && !Array.isArray(parsedPlanet[key])) {
            parsedPlanet[key] = parseInt(parsedPlanet[key]);
        }
    }
    return parsedPlanet;
});

export const fetchResidents = createAsyncThunk('galaxy/fetchResidents', async (urls) => {
    if (typeof urls === "string") {
        const response = await fetch(baseAPI + "people/");
        const data = await response.json();
        return { residents: [...data.results] };
    }
    const fetchedResidents = await Promise.all(urls.map((url) => fetch(url))).then(responses => {
        return Promise.all(responses.map(response => response.json()));
    });
    return { residents: [...fetchedResidents] };
});

export const fetchFilms = createAsyncThunk('galaxy/fetchFilms', async (urls) => {
    if (typeof urls === "string") {
        const response = await fetch(baseAPI + "films/");
        const data = await response.json();
        return { films: [...data.results] };
    }
    const fetchedFilms = await Promise.all(urls.map((url) => fetch(url))).then(responses => {
        return Promise.all(responses.map(response => response.json()));
    });
    return { films: [...fetchedFilms] };
});



export const galaxySlice = createSlice({
    name: 'galaxy',
    initialState,
    reducers: {
        updateGalaxy: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, ...action.payload }));
            return { ...state, ...action.payload };
        },
        addPlanet: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, planets: [...state.planets, action.payload] }));
            return {
                ...state,
                planets: [...state.planets, action.payload],
            };
        },
        addResident: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, residents: [...state.residents, action.payload] }));
            return {
                ...state,
                residents: [...state.residents, action.payload]
            };
        },
        clearResidents: (state) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, residents: [] }));
            return {
                ...state,
                residents: []
            };
        },
        addFilm: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, films: [...state.films, action.payload] }));
            return {
                ...state,
                films: [...state.films, action.payload]
            };
        },
        clearFilms: (state) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, films: [] }));
            return {
                ...state,
                films: []
            };
        },
        toggleIntro: (state) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, intro: false }));
            return { ...state, intro: !state.intro };
        },
    },
    extraReducers: {
        [fetchPlanets.fulfilled]: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, planets: action.payload.planets }));
            return { ...state, planets: action.payload.planets };
        },
        [fetchPlanet.fulfilled]: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, planets: [...state.planets, action.payload] }));
            return { ...state, planets: [...state.planets, action.payload] };
        },
        [fetchResidents.fulfilled]: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, residents: action.payload.residents }));
            return { ...state, residents: action.payload.residents };
        },
        [fetchFilms.fulfilled]: (state, action) => {
            sessionStorage.setItem("galaxy", JSON.stringify({ ...state, films: action.payload.films }));
            return { ...state, films: action.payload.films };
        },
    },
});

export const { updateGalaxy, addPlanet, addResident, clearResidents, addFilm, clearFilms, toggleIntro } = galaxySlice.actions;

export default galaxySlice.reducer;