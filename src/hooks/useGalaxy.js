import { useContext } from "react";
import GalaxyContext from "../store/context/galaxy";

// eslint-disable-next-line
export default () => {
    const context = useContext(GalaxyContext);

    return context;
};
