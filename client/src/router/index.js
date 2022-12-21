import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Signin";
import Signup from "../pages/Signup";

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
    }
]);

export default router