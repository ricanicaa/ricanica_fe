import Accordion from "../components/Accordion";
import { questions } from "../data/names";

export const Vote = () => {
    return (
        <div className="Vote">
            <h1>vote 페이지 입니다.</h1>
            <Accordion
                items={questions.map((question) => ({
                    title: question,
                    content: "Content for " + question, // 원하는 내용을 동적으로 추가 가능
                }))}
            />
        </div>
    );
};
