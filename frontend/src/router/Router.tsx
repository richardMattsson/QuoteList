import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";

function Router() {
  const router = createHashRouter([
    {
      element: (
        <>
          <main className="app-main">
            <Outlet />
          </main>
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/bookdetails/:id",
          element: <BookDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
