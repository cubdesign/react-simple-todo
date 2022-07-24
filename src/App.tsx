import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import "./firebaseConfig";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Todo />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
