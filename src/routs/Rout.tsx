import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard/RootDashboard";
import DashBoardHome from "../pages/Dashboard/DashBoardHome/DashBoardHome";
import Users from "../pages/Dashboard/Users/Users";
import RegisterUser from "../pages/RegisterUser/RegisterUser";
import LoginUser from "../pages/LoginUser/LoginUser";
import Verify from "../pages/Verify/Verify";
import Application from "../pages/Dashboard/UserDashboard/Application/Application";
import Personal_information from "../pages/Dashboard/UserDashboard/Personal_information/Personal_information";
import Travel_information from "../pages/Dashboard/UserDashboard/Application/Travel_information";

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
                element: <Application />,
                children: [
                    {
                        path: '/dashboard/application',
                        element: <Personal_information />
                    },
                    {
                        path: '/dashboard/application/travel-information',
                        element: <Travel_information />
                    }
                ]
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
    {
        path: '/verify',
        element: <Verify />
    },
]);

export default Rout;