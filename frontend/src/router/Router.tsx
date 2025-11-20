import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
