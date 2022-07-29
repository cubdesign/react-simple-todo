import { Auth, getAuth, UserCredential } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthUserContext } from "./providers/AuthUser";

const Login = () => {
  const auth: Auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user, login } = useAuthUserContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h1>ログイン</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
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
            name="password"
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          onClick={async (e) => {
            setError("");
            try {
              const userCredential: UserCredential =
                await signInWithEmailAndPassword(auth, email, password);
              login(userCredential.user, () => navigate("/"));
            } catch (error) {
              if (error instanceof Error) {
                setError(error?.message);
              }
              console.log(error);
            }
          }}
        >
          ログイン
        </Button>
        <Box>
          <Button size="small" onClick={() => navigate("/register")}>
            新規登録へ
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
