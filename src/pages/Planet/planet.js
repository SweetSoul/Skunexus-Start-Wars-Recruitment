import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styles from "./planet.module.css";
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanet, fetchPlanets } from '../../store/slices/galaxySlice';

function Planet() {
    const galaxy = useSelector(state => state.galaxy);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useHistory();
    const planetUrl = location.state.url;
    const planetData = galaxy.planets?.find(planet => planet.url === planetUrl);

    useEffect(() => {
        if (!galaxy.planets.length) {
            dispatch(fetchPlanets());
        }
        if (planetData === undefined) {
            dispatch(fetchPlanet(planetUrl));
        }
        // eslint-disable-next-line
    }, []);


    return <div className={styles.container}>
        <h1>{planetData?.name}</h1>
        <div className={styles.infoContainer}>
            <div className='col-6 text-center'>
                <div className='mb-3'>
                    <span>Rotation period: </span>
                    <p>{planetData?.rotation_period}</p>
                </div>
                <div className='mb-3'>
                    <span>Orbital Period: </span>
                    <p>{planetData?.orbital_period}</p>
                </div>
                <div className='mb-3'>
                    <span>Diameter: </span>
                    <p>{planetData?.diameter}</p>
                </div>
                <div className='mb-3'>
                    <span>Climate: </span>
                    <p>{planetData?.climate}</p>
                </div>
                <div className='mb-3'>
                    <span>Gravity: </span>
                    <p>{planetData?.gravity}</p>
                </div>
                <div className='mb-3'>
                    <span>Terrain: </span>
                    <p>{planetData?.terrain}</p>
                </div>
                <div className='mb-3'>
                    <span>Surface water: </span>
                    <p>{planetData?.surface_water}</p>
                </div>
                <div className='mb-3'>
                    <span>Population: </span>
                    <p>{planetData?.population}</p>
                </div>
            </div>
            <div className='col-6 text-center'>
                <h5>Random image about planet</h5>
                <img src={`https://source.unsplash.com/random/350x500/?${planetData?.name},${planetData?.terrain}`} alt={planetData?.name || ""} width="350" />
            </div>
        </div>
        <Button color="light" onClick={() => navigate.goBack()}>Go Back</Button>
    </div>;
}

export default Planet;
