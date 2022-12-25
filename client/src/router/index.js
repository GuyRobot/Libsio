import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Signin";
import Signup from "../pages/Signup";
import NewResource from "../pages/NewResource";
import ResourcesPage from "../pages/ResourcesPage";
import NewCategoryPage from "../pages/admin/category/NewCategoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signin",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/resources",
        element: <ResourcesPage />
    },
    {
        path: "/resources/new",
        element: <NewResource />
    },
    {
        path: "/admin",
        element: <><Outlet></Outlet></>,
        children: [
            {
                path: "categories",
                element: <><Outlet></Outlet></>,
                children: [
                    {
                        path: "new",
                        element: <NewCategoryPage />
                    }
                ]
            }
        ]
    },
]);

export default router