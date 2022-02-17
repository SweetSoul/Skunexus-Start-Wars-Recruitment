import styles from './App.module.css';

import Planets from '../../components/Planets';

const App = () => {
  return (
    <div className={styles.App}>
      <Planets countFilms countResidents />
    </div>
  );
};

export default App;
