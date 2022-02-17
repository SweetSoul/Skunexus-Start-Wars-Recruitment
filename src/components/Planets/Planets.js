import { useEffect } from 'react';
import useGalaxy from '../../hooks/useGalaxy';
import Grid from '../Grid';
import useData from '../../hooks/useData';
import PropTypes from 'prop-types';
import _ from 'lodash';


function Planets({ countFilms, countResidents }) {
  const { galaxy, updateGalaxy } = useGalaxy();
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
      updateGalaxy('FETCH_PLANETS');
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
