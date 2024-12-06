import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Splash = () => {
  const API_BASE = import.meta.env.VITE_APP_API_BASE;
  const { control, handleSubmit } = useForm();
  const nav = useNavigate();

  const isLogin = useAuth();
  if (isLogin) nav("/home");

  //로그인
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
    <Grid item style={{ border: "1px solid black" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} spacing={3}>
          <Grid item style={{ width: "70%" }}>
            <Controller
              name="ID"
              control={control}
              defaultValue=""
              rules={{ required: "아이디를 입력해주세요" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="ID"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: "70%" }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "비밀번호를 입력해주세요" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: "30%" }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
