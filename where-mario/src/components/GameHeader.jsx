import styles from './GameHeader.module.scss';

import yoshi from '../assets/yoshi.png';
import waluigi from '../assets/waluigi.png';
import jigglypuff from '../assets/jigglypuff.png';
import olimar from '../assets/olimar.png';

const GameHeader = (props) => {
    const characters = props.chars;
    const charImgs = characters.map(char => {
        return (<img src={char.src} alt={char.name} key={char.name} className={styles.character}></img>)
    });

    return (
        <div className={styles.root}>
            <div className={styles.timer}>0</div>
            <div className={styles.characters}>
                {charImgs}
            </div>
        </div>
    );
};

export default GameHeader;