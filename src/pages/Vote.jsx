import { Accordion } from "../components/Accordion";
import { question } from "../data/names";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Vote = () => {
    const isLogin = useAuth();

    return (
        <div className="Vote" style={{ padding: "28px", height: "100vh" }}>
            <h1 style={{ marginLeft: "60px", marginBottom: "70px" }}>
                🗳️ 투표투표
            </h1>
            <Accordion items={question} />
        </div>
    );
};
