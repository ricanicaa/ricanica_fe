import ornament1 from "../image/ornament1.png";
import ornament2 from "../image/ornament2.png";
import ornament3 from "../image/ornament3.png";
import ornament4 from "../image/ornament4.png";
import ornament5 from "../image/ornament5.png";
import ornament6 from "../image/ornament6.png";
import ornament7 from "../image/ornament7.png";
import ornament8 from "../image/ornament8.png";
import ornament9 from "../image/ornament9.png";
import ornament10 from "../image/ornament10.png";
import ornament11 from "../image/ornament11.png";
import ornament12 from "../image/ornament12.png";
import ornament13 from "../image/ornament13.png";
import ornament14 from "../image/ornament14.png";
import ornament15 from "../image/ornament15.png";
import ornament16 from "../image/ornament16.png";
import ornament17 from "../image/ornament17.png";
import ornament18 from "../image/ornament18.png";
import ornament19 from "../image/ornament19.png";
import ornament20 from "../image/ornament20.png";
import ornament21 from "../image/ornament21.png";
import ornament22 from "../image/ornament22.png";
import ornament23 from "../image/ornament23.png";
import ornament24 from "../image/ornament24.png";

const ornaments = [
    ornament1,
    ornament2,
    ornament3,
    ornament4,
    ornament5,
    ornament6,
    ornament7,
    ornament8,
    ornament9,
    ornament10,
    ornament11,
    ornament12,
    ornament13,
    ornament14,
    ornament15,
    ornament16,
    ornament17,
    ornament18,
    ornament19,
    ornament20,
    ornament21,
    ornament22,
    ornament23,
    ornament24,
];

export function getOrnamentsImage(ornamentId) {
    return ornaments[ornamentId - 1] || null;
}

export function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// 목데이터 부분
export const generateRandomNickname = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nickname = "";
    const length = Math.floor(Math.random() * 5) + 1; // 랜덤 1~5 길이의 닉네임
    for (let i = 0; i < length; i++) {
        nickname += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return nickname;
};

export const generateRandomIconType = () => Math.floor(Math.random() * 24) + 1;
