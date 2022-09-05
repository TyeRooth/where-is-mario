import styles from './GamePage.module.scss';
import { useState } from 'react';

import gameImage from '../assets/wheres-mario.jpg';
import GameHeader from './GameHeader';
import Dropdown from './Dropdown';

import yoshi from '../assets/yoshi.png';
import waluigi from '../assets/waluigi.png';
import jigglypuff from '../assets/jigglypuff.png';
import olimar from '../assets/olimar.png';

const GamePage = () => {
    const [characters, setcharacters] = useState(characterDetails);
    const [DropdownCoords, setDropdownCoords] = useState({x: null, y: null});

    const handleClick = (e) => {
        console.log(e);
        if (DropdownCoords.x !== null && DropdownCoords.y !== null) {
            setDropdownCoords({x: null, y: null});
        } else {
            setDropdownCoords({x: e.clientX, y: e.clientY});
        };
    };

    const dropdownMenu = DropdownCoords.x !== null ? 
        <Dropdown chars={characters} coords={DropdownCoords}/> : null;

    return (
        <div className={styles.root}>
            <GameHeader chars={characters}/>
            <img src={gameImage} alt="game" 
                className={styles['game-image']}
                onClick={handleClick}>
            </img>
            {dropdownMenu}
        </div>
    );
};

const characterDetails = [
    {
        name: "Yoshi",
        src: yoshi,
        found: false,
    },
    {
        name: "Waluigi",
        src: waluigi,
        found: false,
    },
    {
        name: "JigglyPuff",
        src: jigglypuff,
        found: false,
    },
    {
        name: "Olimar",
        src: olimar,
        found: false,
    },
];

export default GamePage;