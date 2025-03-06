import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/SignIn";
import Dashboard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
