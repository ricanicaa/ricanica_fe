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
      <h1>vote 페이지 입니다.</h1>
      <Accordion items={question} />
    </div>
  );
};
