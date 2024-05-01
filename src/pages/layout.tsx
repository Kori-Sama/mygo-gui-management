import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useLangStore } from "@/store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loadLang = useLangStore((s) => s.load);
  useEffect(() => {
    loadLang();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    if (pathname == "/") {
      navigate("/dashboard");
    }
  }, [pathname]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
