import { configureStore } from '@reduxjs/toolkit';
import galaxyReducer from "./slices/galaxySlice";
import settingsReducer from "./slices/settingsSlice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        galaxy: galaxyReducer,
    },
});