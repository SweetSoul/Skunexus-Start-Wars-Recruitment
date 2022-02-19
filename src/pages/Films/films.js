import { useEffect } from 'react';
import Grid from '../../components/Grid';
import useData from '../../hooks/useData';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFilms } from '../../store/slices/galaxySlice';


function Films() {
    const dispatch = useDispatch();
    const { filmsData } = useData();
    const location = useLocation();

    let locationUrls = location.state ? location.state.urls : [];
    //deep copy filmsData and filter its values to get only urls that exist in filmsData
    let filmsFiltered = { ...filmsData };
    filmsFiltered.values = filmsFiltered.values.filter(film => {
        return locationUrls.includes(film.url);
    });

    useEffect(() => {
        if (locationUrls.length) {
            dispatch(fetchFilms(locationUrls));
            return;
        }
        dispatch(fetchFilms());
        // eslint-disable-next-line
    }, [locationUrls]);

    return (
        <div>
            <div className="onTop">
                <Grid data={filmsFiltered} />
            </div>
        </div>
    );
}

export default Films;
