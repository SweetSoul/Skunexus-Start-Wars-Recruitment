import { useEffect, useState } from 'react';
import styles from './intro.module.css';
import useGalaxy from '../../hooks/useGalaxy';
import { INTRO_END } from '../../store/reducers/galaxy.reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Intro() {
    const [timer, setTimer] = useState(20);
    const { galaxy, updateGalaxy } = useGalaxy();
    const navigate = useHistory();

    const skipIntro = () => {
        updateGalaxy(INTRO_END);
        navigate.push('/');
    };

    useEffect(() => {
        if (!galaxy.intro) {
            navigate.push("/");
            return;
        }
        const interval = setInterval(() => {
            setTimer(timer => timer - 1);
            if (timer === 1) {
                updateGalaxy(INTRO_END);
                navigate.push('/');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [galaxy.intro, navigate, updateGalaxy, timer]);

    return <div className={styles.fullScreen}>
        <div className={styles.wrapper}>
            <button className={styles.galaxyButton} onClick={skipIntro}>
                Skip
            </button>
        </div>
        <div className="galaxyBg">
            <div className='crawl'>
                <div className='title'>
                    <h1>Project Star Wars Planet</h1>
                </div>
                <p>A long time ago in a galaxy far, far away.…</p>
                <p>
                    I've made this app without redux! But to showcase a new approach of using
                    React useContext() to share data between components and useReducer() to
                    manage state.
                </p>
                <p>
                    I hope you enjoy the work! I'm looking forward to see yours feedbacks!
                </p>
                <p>
                    You can press the button to skip the intro or wait {timer}sec :)
                </p>
            </div>
        </div>
    </div>;
}