import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthUserContext } from "./providers/AuthUser";

const Register = () => {
  const auth: Auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user, login } = useAuthUserContext();

  if (user) {
    return <Navigate to="/" />;
  }

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
        onClick={async () => {
          setError("");
          if (password !== passwordConfirm) {
            setError("パスワードが一致しません");
            return;
          }
          try {
            const userCredential: UserCredential =
              await createUserWithEmailAndPassword(auth, email, password);
            login(userCredential.user, () => navigate("/"));
          } catch (error) {
            if (error instanceof Error) {
              setError(error?.message);
            }
            console.log(error);
          }
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            label="メールアドレス"
            value={email}
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="new-password"
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="new-password-confirm"
            label="パスワード（確認用）"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" size="small">
          登録
        </Button>
        <Box>
          <Button size="small" onClick={() => navigate("/login")}>
            ログインへ
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
