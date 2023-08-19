import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";


export default function RootLayout() {
  return (
    <>
      <main className="block md:grid md:grid-flow-col grid-cols-5 m-auto">
        <div className="col-span-1 hidden md:block">
          <Sidebar />
        </div>
       <Header/>
        <div className="col-span-5 flex container p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
