import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="h-[90vh] relative">
        <Outlet />
      </div>
        <Footer />
    </div>
  );
}
