import { useEffect } from 'react';
import Grid from '../../components/Grid';
import useData from '../../hooks/useData';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchResidents } from '../../store/slices/galaxySlice';


function Residents() {
    const dispatch = useDispatch();
    const { residentsData } = useData();
    const location = useLocation();

    let locationUrls = location.state ? location.state.urls : [];

    useEffect(() => {
        if (locationUrls) {
            dispatch(fetchResidents(locationUrls));
            return;
        }
        dispatch(fetchResidents());
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
