import {motion} from "framer-motion";

export default function GameOver ({gameResult, playClickSound, restartGame}) {
    return (
        <>
            <motion.div
                className={gameResult === 1 ? "win" : "lose"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8}}
                exit={{opacity: 0}}>
                <div>You {gameResult === 1 ? "WON!" : "LOST!"}</div>
                <button onClick={() => {
                    console.log(restartGame);
                    restartGame(gameResult);
                    playClickSound();
                    }
                }>
                    Restart
                </button>
            </motion.div>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 0.6}}
                transition={{duration: 0.7}}
                exit={{opacity: 0}}
                className="overlay">
            </motion.div>
        </>
    );
}