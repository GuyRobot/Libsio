import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Signin";
import Signup from "../pages/Signup";
import NewResource from "../pages/NewResource";
import ResourcesPage from "../pages/ResourcesPage";

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
    }
]);

export default router