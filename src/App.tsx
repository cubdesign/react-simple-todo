import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import "./firebaseConfig";
import ProtectedLayout from "./components/ProtectedLayout";
import AuthUserProvider from "./providers/AuthUser";

const App = () => {
  return (
    <AuthUserProvider>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Todo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthUserProvider>
  );
};

export default App;
