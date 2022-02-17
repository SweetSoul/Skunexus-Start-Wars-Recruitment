import { useHistory } from "react-router-dom";
import { UPDATE_SETTINGS } from "../store/reducers/settings.reducer";
import useGalaxy from "./useGalaxy";
import useSettings from "./useSettings";

export default function useData() {
    const { galaxy } = useGalaxy();
    const { updateSettings } = useSettings();
    const navigate = useHistory();

    const planetsData = {
        header: [
            'name',
            'rotation_period',
            'orbital_period',
            'diameter',
            'climate',
            'gravity',
            'terrain',
            'surface_water',
            'population',
            'films',
            'residents'
        ],
        values: galaxy.planets,
        actions: [
            {
                label: 'Go to Films',
                controller: 'films',
                action: (row) => { navigate.push('/films', { urls: row.films }); }
            },
            {
                label: 'Go to Residents',
                controller: 'residents',
                action: (row) => { navigate.push('/residents', { urls: row.residents }); }
            },
            {
                label: 'Planet info',
                controller: 'url',
                action: (row) => { navigate.push('/planet', { url: row.url }); }
            }
        ],
        gridBtns: [
            {
                label: "New planet",
                action: () => updateSettings(UPDATE_SETTINGS, { modal: { newPlanet: true } })
            }
        ],
    };

    const filmsData = {
        header: [
            'title',
            'episode_id',
            'opening_crawl',
            'director',
            'producer',
            'release_date',
        ],
        values: galaxy.films,
        gridBtns: [
            {
                label: "Back to planets",
                action: () => navigate.push('/')
            }
        ],
    };

    const residentsData = {
        header: [
            'name',
            'height',
            'mass',
            'birth_year',
            'gender'
        ],
        values: galaxy.residents,
        actions: [
            {
                label: "Check homeworld",
                controller: 'homeworld',
                action: (row) => { navigate.push("/planet", { url: row.homeworld }); }
            }
        ],
        gridBtns: [
            {
                label: "Back to planets",
                action: () => navigate.push('/')
            }
        ],
    };


    return { planetsData, residentsData, filmsData };
}