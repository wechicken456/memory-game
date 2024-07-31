import { useEffect, useState } from "react";
import "../styles/GamePage.scss";
import allCharacters from "../characters.js";
import Header from "../components/Header.js";
import Card from "../components/Card.js";
import GameOver from "../components/GameOver.js";
import {motion, AnimatePresence} from "framer-motion";

export default function GamePage({difficultyLevel, goBackHome, playClickSound}) {
    const [characterSet, setCharacterSet] = useState([]);
    const [charactersToDisplay, setCharactersToDisplay] = useState([]);
    const [isFlipping, setIsFlipping] = useState(false);
    const [curScore, setCurScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameResult, setGameResult] = useState(0);

    function shuffleAllCharacters() {
        let j, x, i;
        
        // use Fisher–Yates shuffle algorithm
        for (i = allCharacters.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = allCharacters[i];
            allCharacters[i] = allCharacters[j];
            allCharacters[j] = x;
        }
    }

    function getCharacterSet() {
        let s = [];
        for (let i = 0 ; i < difficultyLevel[0]; i++) {
            s.push(allCharacters[i]);
        }
        setCharacterSet(s);
        getCharactersToDisplay(s);
    }

    function getCharactersToDisplay(characters) {
        let displayCharacters = [];
        let numClicked = 0;

        while(displayCharacters.length < difficultyLevel[1]) {
            let j = Math.floor(Math.random()*characters.length);
            let curChar = characters[j];
            // we need at least 1 unclicked character
            if (!displayCharacters.includes(curChar)
            && (numClicked < difficultyLevel[1] - 1 || !curChar.clicked)) {
                displayCharacters.push(curChar);
                numClicked += curChar.clicked;
            }
        }
       setCharactersToDisplay(displayCharacters.slice(0, difficultyLevel[1]));
    }

    function handleCardClick(character) {
        
        // if the cards are flipping, prevent actions
        if (isFlipping) {
            return;
        }
        
        let res = checkResult(character);
        setGameResult(res);
        setBestScore(Math.floor(Math.max(curScore, bestScore)));
        if (res === 0) {
            character.clicked = true;
            setCurScore(curScore + 1);
            playClickSound();
        }
        else {
            return;
        }

        // card flipping animation
        setIsFlipping(true);
        
        // in order for new cards to appear with flipping animation,
        // getCharactersToDisplay routine must finish executing before setIsFlipping(false) renders.
        setTimeout(() => {
            getCharactersToDisplay(characterSet);
        },800);
        
        setTimeout(() => {
            setIsFlipping(false);
        }, 1200);
    }

    function restartGame(res) {
        allCharacters.map(character => character.clicked = false);
        setGameResult(0);
        setCurScore(0);
        getCharactersToDisplay(characterSet);
        //goBackHome();
    }

    function checkResult(character) {
        if (character.clicked) {
            return -1;
        } 
        else {
            if (curScore + 1 === difficultyLevel[0]) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    useEffect(() => {
        shuffleAllCharacters();
        getCharacterSet();
        return () => {
            allCharacters.forEach(character => {character.clicked = false});
            setBestScore(0);
        }
    }, []);

    return (
       <>
        <Header curScore={curScore} scoreGoal={difficultyLevel[0]} bestScore={bestScore} goBackHome={goBackHome}/>
        <motion.div 
            className="playGround"
            variants={{
                        hidden: {scale: 0}, 
                        visible: {scale: 1,}}}
            intial="hidden"
            animate="visible"
            transition={{duration: 1}}>
            <div className="cards">
                {charactersToDisplay.map(character => {
                    return (
                        <Card 
                            character={character}
                            key={character.id}
                            isFlipping={isFlipping}
                            handleCardClick={handleCardClick}
                            />
                    );
                })}
            </div>
        </motion.div>
        <AnimatePresence>   
            {gameResult !== 0 && (
                <GameOver
                    key="modal"
                    gameResult={gameResult}
                    restartGame={restartGame}
                    playClickSound={playClickSound}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </AnimatePresence>
       </> 
    );
}