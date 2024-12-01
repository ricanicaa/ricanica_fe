import { useState, useEffect } from "react";
import { getOrnamentsImage } from "../util/icon";
import { generateRandomNickname, generateRandomIconType } from "../util/icon";
import tree from "../image/tree.png";

const positions = [
    { transform: "translate(-70%, -400%)" },
    { transform: "translate(-150%, -240%)" },
    { transform: "translate(-0%, -280%)" },
    { transform: "translate(-230%, -120%)" },
    { transform: "translate(-80%, -130%)" },
    { transform: "translate(80%, -100%)" },
    { transform: "translate(-140%, 0%)" },
    { transform: "translate(-20%, 60%)" },
    { transform: "translate(-220%, 120%)" },
    { transform: "translate(110%, 120%)" },
];

export const Home = () => {
    const [letters, setLetters] = useState([]);
    const [hasNext, setHasNext] = useState(true); // 더보기 버튼 활성화 여부

    // 목데이터 생성 (15개)
    useEffect(() => {
        const mockData = Array.from({ length: 10 }, (_, index) => ({
            nickname: generateRandomNickname(),
            icon_type: generateRandomIconType(),
            content: `편지 내용 ${index + 1}`,
            letter_id: index,
        }));
        setLetters(mockData);
    }, []);

    return (
        <div className="Home">
            <h1 className="tree-title">Erica 님의 tree</h1>
            <div className="hamburger-bar"></div>
            <div className="tree" style={{ position: "relative" }}>
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
                        >
                            {" "}
                            {iconPath && (
                                <img
                                    src={iconPath}
                                    alt={`장식 ${index + 1}`}
                                    className="ornament-image"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            )}
                            <div
                                className="ornament-text"
                                style={{
                                    color: "white",
                                    textShadow:
                                        " -2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black",
                                }}
                            >
                                {letter.nickname}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
