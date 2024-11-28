import { Accordion } from "../components/Accordion";
import { question } from "../data/names"; // 데이터를 import

export const Vote = () => {
    return (
        <div className="Vote">
            <h1>vote 페이지 입니다.</h1>
            <Accordion
                items={question} // 수정된 question 배열을 사용
            />
        </div>
    );
};
