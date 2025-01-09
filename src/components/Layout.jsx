import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="h-[90vh] relative">
        <Outlet />
        <div id="toast-container" className="absolute top-0 right-0 z-50"></div>
      </div>
        <Footer />
    </div>
  );
}
