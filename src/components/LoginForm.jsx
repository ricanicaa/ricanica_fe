import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";

export const LoginForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                size="small"
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
                size="small"
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
  );
};
