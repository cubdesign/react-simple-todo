import { Auth, getAuth, UserCredential } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthUserContext } from "./providers/AuthUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレスを入力してください"),
  password: yup.string().required("必須です"),
});

const Login = () => {
  const auth: Auth = getAuth();
  const navigate = useNavigate();
  const { user, login } = useAuthUserContext();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setServerError(null);
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password.trim()
      );
      login(userCredential.user, () => navigate("/"));
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="メールアドレス"
            autoFocus={true}
            {...register("email")}
            error={"email" in errors}
            helperText={errors["email"]?.message}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="パスワード"
            type="password"
            {...register("password")}
            error={"password" in errors}
            helperText={errors["password"]?.message}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" size="small">
          ログイン
        </Button>
        <Box>
          <Button size="small" component={Link} to="/register">
            新規登録へ
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
