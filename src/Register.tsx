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
  const [error, setError] = useState<string>("");
  const { user, login } = useAuthUserContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Register</h1>
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
          Register
        </Button>
        <Box>
          <Button size="small" onClick={() => navigate("/login")}>
            Back to login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
