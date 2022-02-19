import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toggleIntro } from "../../store/slices/galaxySlice";

export default function Header() {
    const galaxy = useSelector(state => state.galaxy);
    const dispatch = useDispatch();
    const navigate = useHistory();
    const location = useLocation();
    const isIntro = location.pathname === "/intro";

    const handleIntro = () => {
        dispatch(toggleIntro());
    };

    useEffect(() => {
        if (galaxy?.intro || (sessionStorage.getItem("galaxy") && sessionStorage.galaxy?.intro)) {
            navigate.push('/intro');
        }
    }, [galaxy?.intro, navigate]);

    return !isIntro ? <div className='d-flex align-items-center justify-content-center p-relative'>
        <h1 className="jediFont" onClick={handleIntro}>Star Wars Planets</h1>
        <span className="arrowTitle">{'<<'} Click me to check intro again</span>
    </div> : <div></div>;
}