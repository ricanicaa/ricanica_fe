import { useState, useEffect } from "react";
import "../styles/components/Snowflakes.scss";

export default function Snowflakes({ count, speedRange }) {
    const [snowflake, setSnowflake] = useState([]);

    useEffect(() => {
        const [minSpeed, maxSpeed] = speedRange; // 속도 범위 해체할당
        const newSnowflake = Array.from({ length: count }, (_, index) => ({
            id: index,
            style: {
                left: `${Math.random() * 100}vw`, // 화면 가로 길이
                animationDuration: `${
                    Math.random() * (maxSpeed - minSpeed) + minSpeed
                }s`, // 범위 내 속도 설정
                animationDelay: `${Math.random() * 5}s`, // 0s ~ 5s 사이
                opacity: Math.random() * 0.5 + 0.5, // 투명도 조정
                fontSize: `${Math.random() * 10 + 10}px`, // 크기 랜덤
            },
        }));
        setSnowflake(newSnowflake);
    }, [count, speedRange]);

    return (
        <div className="snowflakes-wrapper" aria-hidden="true">
            {snowflake.map(({ id, style }) => (
                <div key={id} className="snowflake" style={style}></div>
            ))}
        </div>
    );
}
