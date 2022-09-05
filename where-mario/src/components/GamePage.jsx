import styles from './GamePage.module.scss';
import gameImage from '../assets/wheres-mario.jpg';
import GameHeader from './GameHeader';

const GamePage = () => {
    return (
        <div className={styles.root}>
            <GameHeader />
            <img src={gameImage} alt="game" className={styles['game-image']}></img>
        </div>
    );
};

export default GamePage;