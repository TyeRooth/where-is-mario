import styles from './StartPage.module.scss';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <div className={styles.root}>
            <p className={styles.instructions}>{instructions}</p>
            <Link to="game" className={styles['start-link']}>Get Started</Link>
        </div>
    );
};

const instructions = "Find three nintendo characters within an image.  You will be timed on how fast you can find them.";

export default StartPage;