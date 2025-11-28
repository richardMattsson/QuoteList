import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import Navbar from "../components/Navbar";
import Account from "../pages/Account";

function Router() {
  const router = createHashRouter([
    {
      element: (
        <>
          <Navbar />

          <main className="app-main">
            <Outlet />
          </main>
        </>
      ),
      children: [
        {
          path: "/:email?",
          element: <Home />,
        },
        {
          path: "/bookdetails/:id",
          element: <BookDetails />,
        },
        {
          path: "/account/:email?",
          element: <Account />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
