import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useGalaxy from "../../hooks/useGalaxy";
import { UPDATE_GALAXY } from "../../store/reducers/galaxy.reducer";

export default function Header() {
    const { galaxy, updateGalaxy } = useGalaxy();
    const navigate = useHistory();
    const location = useLocation();
    const isIntro = location.pathname === "/intro";

    const handleIntro = () => {
        updateGalaxy(UPDATE_GALAXY, { intro: true });
    };

    useEffect(() => {
        if (galaxy.intro || (sessionStorage.getItem("galaxy") && sessionStorage.galaxy.intro)) {
            navigate.push('/intro');
        }
    }, [galaxy.intro, navigate]);

    return !isIntro ? <div className='d-flex align-items-center justify-content-center p-relative'>
        <h1 className="jediFont" onClick={handleIntro}>Star Wars Planets</h1>
        <span className="arrowTitle">{'<<'} Click me to check intro again</span>
    </div> : <div></div>;
}