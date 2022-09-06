import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
    const validateCharacterPosition = props.positionCheck;
    const characters = props.chars;
    const notFoundChars = characters.filter(char => !char.found);
    const charOptions = notFoundChars.map(char => {
        return (
            <div className={styles.charOption} key={char.name} onClick={() => validateCharacterPosition(char.name)}>
                <img src={char.src} alt={char.name} className={styles.picture}></img>
                <p className={styles.name}>{char.name}</p>
            </div>
        )
    })

    const xCoord = props.coords.x;
    const yCoord = props.coords.y;

    return (
        <div className={styles.root} style={{left: xCoord + 'px', top: yCoord + 'px'}}>
            {charOptions}
        </div>
    );
};

export default Dropdown;