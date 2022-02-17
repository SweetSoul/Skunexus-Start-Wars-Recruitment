import Lottie from '../../components/Lottie/lottie';
import styles from './NotFoundPage.module.css';
import data404 from "../../components/Lottie/animations/404.json";
import { useHistory } from 'react-router-dom';


const NotFoundPage = () => {
  const navigate = useHistory();
  const navigateHome = () => {
    navigate.push("/");
  };
  return (
    <div className={styles.notFoundPage}>
      <button className='blueBtn' onClick={navigateHome}>Go back</button>
      <Lottie animationData={data404} width="auto" height="100%" speed={0.7} />
    </div>
  );
};

export default NotFoundPage;
