import { useEffect } from 'react';
import Grid from '../Grid';
import useData from '../../hooks/useData';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../../store/slices/galaxySlice';


function Planets({ countFilms, countResidents }) {
  const galaxy = useSelector(state => state.galaxy);
  const dispatch = useDispatch();
  const { planetsData } = useData();

  const finalData = _.cloneDeep(planetsData);
  if (!countFilms) {
    finalData.values.map(planet => delete planet.films);
    finalData.header.splice(finalData.header.indexOf('films'), 1);
  };
  if (!countResidents) {
    finalData.values.map(planet => delete planet.residents);
    finalData.header.splice(finalData.header.indexOf('residents'), 1);
  };

  useEffect(() => {
    if (!galaxy.planets?.length) {
      dispatch(fetchPlanets());
    }
    // eslint-disable-next-line
  }, [galaxy.planets]);

  return (
    <div>
      <div className="onTop">
        <Grid data={finalData} />
      </div>
    </div>
  );
}

Planets.propTypes = {
  countFilms: PropTypes.bool,
  countResidents: PropTypes.bool,
};

export default Planets;
