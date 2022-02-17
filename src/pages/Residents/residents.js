import { useEffect } from 'react';
import useGalaxy from '../../hooks/useGalaxy';
import Grid from '../../components/Grid';
import useData from '../../hooks/useData';
import { useLocation } from 'react-router-dom';


function Residents() {
    const { updateGalaxy } = useGalaxy();
    const { residentsData } = useData();
    const location = useLocation();

    let locationUrls = location.state ? location.state.urls : [];

    useEffect(() => {
        if (locationUrls) {
            updateGalaxy('FETCH_RESIDENTS', { urls: locationUrls });
            return;
        }
        updateGalaxy('FETCH_RESIDENTS');
        // eslint-disable-next-line
    }, [locationUrls]);

    return (
        <div>
            <div className="onTop">
                <Grid data={residentsData} />
            </div>
        </div>
    );
}

export default Residents;
