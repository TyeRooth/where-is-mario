import styles from './GameHeader.module.scss';

const GameHeader = (props) => {
    const characters = props.chars;
    const charImgs = characters.map(char => {
        let charStyle = styles.character;
        if (char.found) {charStyle = styles.found};
        return (<img src={char.src} alt={char.name} key={char.name} className={charStyle}></img>)
    });

    return (
        <div className={styles.root}>
            <div className={styles.timer}>{props.time}</div>
            <div className={styles.characters}>
                {charImgs}
            </div>
        </div>
    );
};

export default GameHeader;