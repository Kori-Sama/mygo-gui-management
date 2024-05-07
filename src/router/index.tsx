import Dashboard from "@/pages/dashborad";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import SettingsPage from "@/pages/settings";
import TransactionPage from "@/pages/transaction";
import UserPage from "@/pages/user";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
