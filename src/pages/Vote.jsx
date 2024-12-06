import { Accordion } from "../components/Accordion";
import { question } from "../data/names";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Vote = () => {

  const isLogin = useAuth();
  const navigate = useNavigate();

  if (!isLogin) navigate("/");
  return (
    <div className="Vote">
      <h1 style={{ marginLeft: "60px" }}>🗳️ 투표투표</h1>
      <Accordion items={question} />
    </div>
  );

};
