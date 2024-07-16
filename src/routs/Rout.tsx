import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard/RootDashboard";
import DashBoardHome from "../pages/Dashboard/DashBoardHome/DashBoardHome";
import Users from "../pages/Dashboard/Users/Users";
import RegisterUser from "../pages/RegisterUser/RegisterUser";
import LoginUser from "../pages/LoginUser/LoginUser";
import Tourist from "../pages/Dashboard/UserDashboard/Application/Tourist";
import Business from "../pages/Dashboard/UserDashboard/Application/Business";
import Student from "../pages/Dashboard/UserDashboard/Application/Student";

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
                path: '/dashboard/application',
                element: <Tourist />
            },
            {
                path: '/dashboard/application/tourist',
                element: <Tourist />
            },
            {
                path: '/dashboard/application/business',
                element: <Business />
            },
            {
                path: '/dashboard/application/student',
                element: <Student />
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
    {
        path: '/login',
        element: <LoginUser />
    },
]);

export default Rout;