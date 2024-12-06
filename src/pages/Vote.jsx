import { Accordion } from "../components/Accordion";
import { question } from "../data/names";

export const Vote = () => {
    return (
        <div className="Vote">
            <h1 style={{ marginLeft: "60px" }}>🗳️ 투표투표</h1>
            <Accordion items={question} />
        </div>
    );
};
