import { Accordion } from "../components/Accordion";
import { question } from "../data/names";

export const Vote = () => {
    return (
        <div className="Vote">
            <h1>vote 페이지 입니다.</h1>
            <Accordion
                items={question}
            />
        </div>
    );
};
