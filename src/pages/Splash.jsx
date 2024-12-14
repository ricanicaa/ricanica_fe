// Splash.js
import { Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";
import santa from "../image/santa.png";

export const Splash = () => {
  const API_BASE = import.meta.env.VITE_APP_API_BASE;
  const nav = useNavigate();

  const isLogin = useAuth();
  if (isLogin) nav("/home");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/members/login`,
        {
          english_name: data.ID,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("로그인 성공");
        sessionStorage.setItem("member_id", JSON.stringify(res.data.data));
        nav("/home");
      } else {
        console.log("제출 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="splash"
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <img style={{ marginLeft: "10%", width: "40%" }} src={santa} />
      {/* <Grid
      item
      style={{
        border: "1px solid black",
        marginTop: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}
    > */}
      <LoginForm onSubmit={onSubmit} />
      {/* </Grid> */}
    </div>
  );
};
