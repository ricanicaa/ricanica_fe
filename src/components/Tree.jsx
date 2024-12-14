import { getOrnamentsImage } from "../util/icon";
import tree from "../image/tree.png";

const positions = [
    { transform: "translate(-40%, -400%)" },
    { transform: "translate(-110%, -240%)" },
    { transform: "translate(40%, -280%)" },
    { transform: "translate(-190%, -120%)" },
    { transform: "translate(-40%, -130%)" },
    { transform: "translate(120%, -100%)" },
    { transform: "translate(-100%, 0%)" },
    { transform: "translate(20%, 60%)" },
    { transform: "translate(-180%, 120%)" },
    { transform: "translate(150%, 120%)" },
];

export const Tree = ({ letters, onLetterClick }) => {
    return (
        <div
            className="tree"
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
            }}
        >
            <img src={tree} alt="Tree" />
            {letters.map((letter, index) => {
                const position = positions[index % positions.length];
                const iconPath = getOrnamentsImage(letter.icon_type);

                return (
                    <div
                        key={letter.letter_id}
                        style={{
                            ...position,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "70px",
                            height: "70px",
                            textAlign: "center",
                        }}
                        onClick={() => onLetterClick(letter)}
                    >
                        {iconPath && (
                            <img
                                src={iconPath}
                                alt={`장식 ${index + 1}`}
                                className="ornament-image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    margin: "auto",
                                }}
                            />
                        )}
                        <div
                            className="ornament-text"
                            style={{
                                color: "white",
                                textShadow:
                                    "-2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black",
                            }}
                        >
                            {letter.nickname}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
