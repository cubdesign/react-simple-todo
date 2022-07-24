import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unSubscription = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => {
      unSubscription();
    };
  }, []);
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
