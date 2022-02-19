import { createSlice } from '@reduxjs/toolkit';

const initialState = sessionStorage.getItem("settings")
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

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            sessionStorage.setItem("settings", JSON.stringify({ ...state, ...action.payload }));
            return {
                ...state,
                ...action.payload,
            };
        }
    },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;