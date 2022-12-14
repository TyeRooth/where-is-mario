import styles from './GamePage.module.scss';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

import gameImage from '../assets/wheres-mario.jpg';
import GameHeader from './GameHeader';
import Dropdown from './Dropdown';
import NamePrompt from './NamePrompt';

import yoshi from '../assets/yoshi.png';
import waluigi from '../assets/waluigi.png';
import jigglypuff from '../assets/jigglypuff.png';
import olimar from '../assets/olimar.png';
import { useEffect } from 'react';

const GamePage = () => {
    const [characters, setcharacters] = useState(characterDetails);

    //x,y for where clicked.  xRel,yRel for where in the image was clicked (value between 0-1)
    const [dropdownCoords, setDropdownCoords] = useState({x: null, y: null, xRel: null, yRel: null});

    //Check for Win
    const [win, setWin] = useState(false);
    useEffect(() => {
        if (characters.filter(char => !char.found).length === 0) {
            setWin(true);
        } else {setWin(false)};
        // The else statement is needed for resetting the game
    });

    console.log(win);
    console.log(characters);

    const [timer, setTimer] = useState(0);
    useEffect(() => {
        if (!win) {
            setTimeout(() => {
                setTimer(timer + 1);
            }, 1000);
        }
    });

    const handleImageClick = (e) => {
        if (dropdownCoords.x !== null && dropdownCoords.y !== null) {
            setDropdownCoords({x: null, y: null, xRel: null, yRel: null});
        } else {
            setDropdownCoords({
                x: e.pageX,
                y: e.pageY,
                xRel: calculatePositionInImage(e.target.width, e.target.offsetLeft, e.pageX),
                yRel: calculatePositionInImage(e.target.height, e.target.offsetTop, e.pageY),
            });
        };
    };

    // Takes the current image/page dimensions to calculate where the click is within the image.
    //The output of this function will be a value between 0 and 1.
    //This will be the value that is compared against in the back-end.
    const calculatePositionInImage = (gameDimension, gameOffset, clickedCoord) => {
        return (clickedCoord - gameOffset)/gameDimension;
    }

    const validateCharacterFound = async (name) => {
        const docRef = doc(db, "Character Locations", name);
        const positionsDoc = await getDoc(docRef);
        const charPos = positionsDoc._document.data.value.mapValue.fields
        if (checkWithinCoords(charPos)) {
            markCharacterAsFound(name);
        }
        handleImageClick();
    };
    
    const checkWithinCoords = (charBox) => {
        const x = dropdownCoords.xRel;
        const y = dropdownCoords.yRel;
        const left = charBox.left.doubleValue;
        const top = charBox.top.doubleValue;
        const right = charBox.right.doubleValue;
        const bottom = charBox.bottom.doubleValue;
        if (x > left && x < right && y > top && y < bottom) {
            return true;
        } else {return false};
    };

    const markCharacterAsFound = (name) => {
        const updatedCharacters = characters.map(char => {
            if (char.name === name) {
                char.found = true;
            };
            return char;
        });
        setcharacters(updatedCharacters);
    };

    const resetGame = () => {
        const resetChars = characters.map(char => {
            char.found = false;
            return char;
        });
        setcharacters(resetChars);
    };

    const dropdownMenu = dropdownCoords.x !== null && dropdownCoords.y !== null ? 
        <Dropdown chars={characters} coords={dropdownCoords} positionCheck={validateCharacterFound}/> : null;

    const winPrompt = win ? <NamePrompt time={timer} reset={resetGame}/> : null;

    return (
        <div className={styles.root}>
            <GameHeader chars={characters} time={timer}/>
            <img src={gameImage} alt="game" 
                className={styles['game-image']}
                onClick={handleImageClick}>
            </img>
            {dropdownMenu}
            {winPrompt}
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
        name: "Jigglypuff",
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