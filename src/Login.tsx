import { Auth, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
  const auth: Auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const unSubscription = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => {
      unSubscription();
    };
  }, []);

  return (
    <div>
      <h1>Login</h1>
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
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={async (e) => {
            try {
              await signInWithEmailAndPassword(auth, email, password);
              navigate("/");
            } catch (error) {
              if (error instanceof Error) {
                setError(error?.message);
              }
              console.log(error);
            }
          }}
        >
          Login
        </Button>
        <Box>
          <Button size="small" onClick={() => navigate("/register")}>
            Create new account ?
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
