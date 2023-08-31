import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BottomNavbar from "./BottomNavbar";
import { Toaster } from "../ui/toaster";

export default function RootLayout() {
  const { currentUser } = useAuth();

  return (
    <>
      <main className="block md:grid md:grid-flow-col grid-cols-5 m-auto">
        <div className="col-span-1 hidden md:block">
          <Sidebar uid={currentUser?.uid!} />
        </div>
        <BottomNavbar uid={currentUser?.uid!} />
        <div className="col-span-5 flex container p-8 mb-12 md:mb-0">
        <Toaster />          
          <Outlet />

        </div>
      </main>
    </>
  );
}
