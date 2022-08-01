import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthUserContext } from "./providers/AuthUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface IFormInput {
  email: string;
  "new-password": string;
  "confirm-password": string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレスを入力してください"),
  "new-password": yup.string().required("必須です"),
  "confirm-password": yup
    .string()
    .oneOf([yup.ref("new-password"), null], "パスワードが一致しません"),
});

const Register = () => {
  const auth: Auth = getAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { user, login } = useAuthUserContext();

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
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email.trim(),
          data["new-password"].trim()
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
      <h1>新規登録</h1>
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
            {...register("new-password")}
            error={"new-password" in errors}
            helperText={errors["new-password"]?.message}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="パスワード（確認用）"
            type="password"
            {...register("confirm-password")}
            error={"confirm-password" in errors}
            helperText={errors["confirm-password"]?.message}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" size="small">
          登録
        </Button>
        <Box>
          <Button size="small" component={Link} to="/login">
            ログインへ
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
