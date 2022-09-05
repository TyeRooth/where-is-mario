import styles from './GameHeader.module.scss';

import yoshi from '../assets/yoshi.png';
import waluigi from '../assets/waluigi.png';
import jigglypuff from '../assets/jigglypuff.png';
import olimar from '../assets/olimar.png';

const GameHeader = () => {
    return (
        <div className={styles.root}>
            <div className={styles.timer}>0</div>
            <div className={styles.characters}>
                <img src={yoshi} alt="yoshi" className={styles.character}></img>
                <img src={waluigi} alt="waluigi" className={styles.character}></img>
                <img src={jigglypuff} alt="jigglypuff" className={styles.character}></img>
                <img src={olimar} alt="olimar" className={styles.character}></img>
            </div>
        </div>
    );
};

export default GameHeader;