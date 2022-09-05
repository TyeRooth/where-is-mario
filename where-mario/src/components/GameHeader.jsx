import styles from './GameHeader.module.scss';

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