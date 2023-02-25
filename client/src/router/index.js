import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Signin";
import Signup from "../pages/Signup";
import NewResource from "../pages/NewResource";
import ResourcesPage from "../pages/ResourcesPage";
import NewCategoryPage from "../pages/admin/category/NewCategoryPage";
import UserResourcesPage from "../pages/user/resource/UserResourcePage";
import AdminResourcePage from "../pages/admin/resource/AdminResourcePage";
import Nav from "../components/Nav";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <div>
        <Nav></Nav>
        <Outlet></Outlet>
      </div>
    ),
    children: [
      {
        path: "",
        element: <ResourcesPage />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/resources/new",
        element: <NewResource />,
      },
      {
        path: "/admin",
        element: (
          <>
            <Outlet></Outlet>
          </>
        ),
        children: [
          {
            path: "categories",
            element: (
              <>
                <Outlet></Outlet>
              </>
            ),
            children: [
              {
                path: "new",
                element: <NewCategoryPage />,
              },
            ],
          },
          {
            path: "resources",
            element: (
              <>
                <Outlet></Outlet>
              </>
            ),
            children: [
              {
                path: "new",
                element: <NewCategoryPage />,
              },
              {
                path: "",
                element: <AdminResourcePage />,
              },
            ],
          },
        ],
      },
      {
        path: "/user",
        element: (
          <>
            <Outlet></Outlet>
          </>
        ),
        children: [
          {
            path: "resources",
            element: (
              <>
                <Outlet></Outlet>
              </>
            ),
            children: [
              {
                path: "new",
                element: <NewResource />,
              },
              {
                path: "",
                element: <UserResourcesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
