import styles from './GamePage.module.scss';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

import gameImage from '../assets/wheres-mario.jpg';
import GameHeader from './GameHeader';
import Dropdown from './Dropdown';

import yoshi from '../assets/yoshi.png';
import waluigi from '../assets/waluigi.png';
import jigglypuff from '../assets/jigglypuff.png';
import olimar from '../assets/olimar.png';

const GamePage = () => {
    const [characters, setcharacters] = useState(characterDetails);

    //x,y for where clicked.  xRel,yRel for where in the image was clicked (value between 0-1)
    const [dropdownCoords, setDropdownCoords] = useState({x: null, y: null, xRel: null, yRel: null});

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

    const dropdownMenu = dropdownCoords.x !== null ? 
        <Dropdown chars={characters} coords={dropdownCoords} positionCheck={validateCharacterFound}/> : null;

    return (
        <div className={styles.root}>
            <GameHeader chars={characters}/>
            <img src={gameImage} alt="game" 
                className={styles['game-image']}
                onClick={handleImageClick}>
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