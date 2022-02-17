import styles from './Grid.module.css';
import { Table, Button, Spinner } from 'reactstrap';
import formatString, { CAPITALIZE } from '../../utils/formatString';
import PropTypes from 'prop-types';

function Grid({ data: { header = [], values = [], actions = [], gridBtns = [] } }) {

  return (
    <>
      {!!values.length ? <div className='pb-3 mb-5'>
        <Table responsive hover>
          <thead>
            <tr>
              {header.map(colName => <th key={colName} className="text-center">
                <span className='d-block'>{formatString(colName, CAPITALIZE)}</span>
                {values[0] && <small>(
                  {Array.isArray(values[0][colName]) ? "Array" : formatString(typeof values[0][colName], CAPITALIZE)}
                  )</small>}
              </th>)}
              {!!actions.length && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {values.map((row, index) => (
              <tr key={index}>
                {header.map((colName) => <td key={colName} className={typeof row[colName] === "number" ? "text-end" : "text-center"}>{Array.isArray(row[colName]) ? row[colName].length : row[colName]}</td>)}
                {!!actions.length &&
                  <td className={styles.gridActions}>
                    {actions.map(({ label, action, controller }) => {
                      return row[controller] && !!row[controller].length
                        && <Button key={label} color="dark" size="sm" onClick={() => action(row)}>{label}</Button>;
                    })}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='d-flex gap-3 justify-content-center align-items-stretch'>
          {!!gridBtns?.length && gridBtns.map(gridBtn => <div className='d-flex align-items-center justify-content-center mt-3' key={gridBtn.label}>
            <Button color="dark" onClick={() => gridBtn.action()} size="lg">{gridBtn.label}</Button>
          </div>)}
        </div>
      </div>
        : <div className='py-5 d-flex align-items-center justify-content-center'>
          <span>Loading data...</span> <Spinner color='dark' />
        </div>}
    </>
  );
}

Grid.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      population: PropTypes.string,
      residents: PropTypes.arrayOf(PropTypes.string),
      films: PropTypes.arrayOf(PropTypes.string),
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string
    }), PropTypes.shape({
      name: PropTypes.string,
      height: PropTypes.string,
      mass: PropTypes.string,
      hair_color: PropTypes.string,
      skin_color: PropTypes.string,
      birth_year: PropTypes.string,
      gender: PropTypes.string,
      homeworld: PropTypes.string,
      films: PropTypes.arrayOf(PropTypes.string),
      species: PropTypes.arrayOf(PropTypes.string),
      vehicles: PropTypes.arrayOf(PropTypes.string),
      starships: PropTypes.arrayOf(PropTypes.string),
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string
    }), PropTypes.shape({
      title: PropTypes.string,
      episode_id: PropTypes.number,
      opening_crawl: PropTypes.string,
      director: PropTypes.string,
      producer: PropTypes.string,
      release_date: PropTypes.string,
      characters: PropTypes.arrayOf(PropTypes.string),
      planets: PropTypes.arrayOf(PropTypes.string),
      starships: PropTypes.arrayOf(PropTypes.string),
      vehicles: PropTypes.arrayOf(PropTypes.string),
      species: PropTypes.arrayOf(PropTypes.string),
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string
    })])).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      controller: PropTypes.string,
      action: PropTypes.func.isRequired
    })),
    gridBtns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func
    }))
  })
};

export default Grid;
