import React, {useState } from "react";
import Sound from "react-sound";
import StartPage from "./pages/StartPage.js";
import GamePage from "./pages/GamePage.js";
import Footer from "./components/Footer.js";
import {motion} from 'framer-motion';
import backgroundImg from './assets/rift.jpg';
import backgroundMusic from "./assets/music.mp3";

const variants = {
  visible: {
      opacity: 1, 
      scale: 1, 
      transition: {duration: 0.7},
  },
  hidden: {opacity: 0, scale: 0},
}

export default function App() {
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  const [isMusicOn, setIsMusicOn] = useState(false);


  const play = () => {

  }

  const playClickSound = () => {

  }

  const goBackHome = () => {
      // this will cause React to re-render and display the StartPage
      setDifficultyLevel([]);
  }

  return (
    <>
      {!difficultyLevel.length
      ? <StartPage setDifficultyLevel={setDifficultyLevel} play={play}/>
      : <GamePage difficultyLevel={difficultyLevel} goBackHome={goBackHome} playClickSound={playClickSound}/>
      }
      <motion.img 
      src={backgroundImg} 
      className="backgroundImg"
      variants={variants}
      initial="hidden"
      animate="visible"/>

      <Footer playClickSound={playClickSound} 
              isMusicOn={isMusicOn} 
              setIsMusicOn={setIsMusicOn}> 
      </Footer>
      <Sound 
          url={backgroundMusic}
          playStatus={isMusicOn ? Sound.status.PLAYING : Sound.status.PAUSED}
          volume={30}
          loop={true}/>
    </>        
  );
}
