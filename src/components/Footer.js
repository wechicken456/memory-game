import {motion} from "framer-motion";
import {ReactComponent as MusicOn} from "../assets/SoundOn.svg";
import {ReactComponent as MusicOff} from "../assets/SoundOff.svg";
import "../styles/Footer.scss"

export default function Footer({isMusicOn, setIsMusicOn, playClickSound}) {
    const variants = {
        visible: {
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {duration: 0.7},
        },
        hidden: {opacity: 0, scale: 0, y: 100},
    }

    // audio on safari: https://web.archive.org/web/20170215083556/http://www.ibm.com/developerworks/library/wa-ioshtml5/
    return(
        <motion.footer
            className="audioFooter"
            initial="hidden"
            animate="visible">
            <motion.button 
                className="soundButton"
                variants={variants}
                onClick={() => {
                    setIsMusicOn(!isMusicOn);
                    playClickSound();
                }}>
                {isMusicOn 
                ? <MusicOn className="audio-icon"/>
                : <MusicOff className="audio-icon"/>}
            </motion.button>
        </motion.footer>
    );
}