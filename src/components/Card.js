import "../styles/GamePage.scss";
import Tilt from "react-parallax-tilt"; // For tilt hover effect on card

export default function Card({character, isFlipping, handleCardClick}) {
    return (
        <div className={isFlipping ? "card flipped" : "card"}
            onClick={() => {handleCardClick(character)}}>
            <Tilt
            glareEnable={true}
            glareColor="white"
            glareMaxOpacity={0.4}
            glareBorderRadius="2rem"
            glarePosition="bottom"
            className="tilt"
            >
                <div className="cardFace">
                        <img alt="cardImg" className="cardImg" src={character.src}></img>
                        <div className="cardName">{character.id}</div>
                </div>
                <div className="cardBack">
                </div>
            </Tilt>
        </div>
        
    );
}