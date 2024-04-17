import Header from "@/components/header";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname == "/") {
      navigate("/dashboard");
    }
  }, [navigate, pathname]);
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
