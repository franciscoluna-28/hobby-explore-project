import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <main className="lg:grid lg:grid-cols-5">
        <div className="lg:grid-span-1 hidden lg:block ">
          <Sidebar />
        </div>
        <div className="lg:col-span-4 container p-8 flex">
          <Outlet />
        </div>
      </main>
    </>
  );
}
