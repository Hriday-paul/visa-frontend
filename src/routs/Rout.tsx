import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard/RootDashboard";
import DashBoardHome from "../pages/Dashboard/DashBoardHome/DashBoardHome";
import Users from "../pages/Dashboard/Users/Users";
import RegisterUser from "../pages/RegisterUser/RegisterUser";

const Rout = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [{
            path: '/',
            element: <Home />
        }]
    },
    {
        path: '/dashboard',
        element: <RootDashboard />,
        children: [
            {
                path: '/dashboard',
                element: <DashBoardHome />
            },
            {
                path: '/dashboard/users',
                element: <Users />
            },
        ]
    },
    {
        path: '/register',
        element: <RegisterUser />
    },
]);

export default Rout;