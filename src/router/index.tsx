import Dashboard from "@/pages/dashborad";
import Layout from "@/pages/layout";
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
    ],
  },
]);

export default router;
