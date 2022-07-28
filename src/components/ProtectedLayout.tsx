import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserContext } from "../providers/AuthUser";
import Footer from "./Footer";
import Header from "./Header";
const ProtectedLayout = () => {
  const { user } = useAuthUserContext();
  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("user", user);

  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default ProtectedLayout;
