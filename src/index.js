import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './routers';
import reportWebVitals from './reportWebVitals';
import { GalaxyProvider } from './store/context/galaxy';
import galaxyReducer, { initialGalaxyState } from './store/reducers/galaxy.reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SettingsProvider } from './store/context/settings';
import settingsReducer, { initialSettingsState } from './store/reducers/settings.reducer';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider reducer={settingsReducer} initialState={initialSettingsState}>
      <GalaxyProvider reducer={galaxyReducer} initialState={initialGalaxyState}>
        <Routers />
      </GalaxyProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
