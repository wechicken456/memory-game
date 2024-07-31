import {motion} from "framer-motion";
import logo from "../assets/logo.png";

export default function Header({curScore, bestScore, scoreGoal, goBackHome}) {
    const variants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {duration: 1},
        }
    }
    return (
        <header>
            <motion.img
                className="headerLogo"
                src={logo}
                onClick={() => {
                    goBackHome();
                }}
                variants={variants}
                initial="hidden"
                animate="visible">
            </motion.img>
            <motion.div 
                className="scoreBoard"
                variants={variants}
                initial="hidden"
                animate="visible">
                <div>Score: {curScore}/{scoreGoal}</div>
                <div>Best score: {bestScore}</div>
            </motion.div>
        </header>
    );
}