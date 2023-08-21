import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client-instance";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { SidebarProvider } from "./context/sidebarContext";
import RootLayout from "./components/layout/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import RecoverPassword from "./pages/auth/RecoverPassword";
import Profile from "./pages/Profile";
import ActivityPage from "./pages/activity/ActivityPage";
import FAQ from "./pages/FAQ";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route element={<RootLayout />}>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/activities/:id"
              element={
                <PrivateRoute>
                  <ActivityPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/faq"
              element={
                <PrivateRoute>
                  <FAQ />
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <RouterProvider router={router}></RouterProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;