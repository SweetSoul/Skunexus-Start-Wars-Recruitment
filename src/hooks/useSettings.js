import { useContext } from "react";
import SettingsContext from "../store/context/settings";

// eslint-disable-next-line
export default () => {
    const context = useContext(SettingsContext);

    return context;
};
