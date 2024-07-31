import "../styles/StartPage.scss";
import {motion} from 'framer-motion';
import logo from '../assets/logo.png';

export default function StartPage({setDifficultyLevel, play}) {
    const variants = {
        visible: {
            opacity: 1, 
            scale: 1, 
            transition: {duration: 0.7},
        },
        hidden: {opacity: 0, scale: 0},
    }

    return (
        <> 
            <motion.div 
                className="startPage" 
                initial="hidden" 
                animate="visible">
                <motion.img 
                    src={logo}
                    className="logo"
                    variants={variants} />
                <motion.h1
                    variants={variants}>
                    Memory Card Game
                </motion.h1>
                <motion.div
                    className="difficultyLevels"
                    variants={variants}>
                    <button onClick={() => {
                        setDifficultyLevel([8, 3]);
                        play();
                    }}>
                    Easy</button>
                    <button onClick={() => {
                        setDifficultyLevel([10, 4]);
                        play();
                    }}>
                    Medium</button>
                    <button onClick={() => {
                        setDifficultyLevel([12, 5]);
                        play();
                    }}>
                    Hard</button>
                </motion.div>
            </motion.div>
        </>
    );
}




