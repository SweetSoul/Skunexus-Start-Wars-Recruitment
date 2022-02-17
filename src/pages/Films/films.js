import { useEffect } from 'react';
import useGalaxy from '../../hooks/useGalaxy';
import Grid from '../../components/Grid';
import useData from '../../hooks/useData';
import { useLocation } from 'react-router-dom';


function Films() {
    const { updateGalaxy } = useGalaxy();
    const { filmsData } = useData();
    const location = useLocation();

    let locationUrls = location.state ? location.state.urls : [];

    useEffect(() => {
        if (locationUrls.length) {
            updateGalaxy('FETCH_FILMS', { urls: locationUrls });
            return;
        }
        updateGalaxy('FETCH_FILMS');
        // eslint-disable-next-line
    }, [locationUrls]);

    return (
        <div>
            <div className="onTop">
                <Grid data={filmsData} />
            </div>
        </div>
    );
}

export default Films;
