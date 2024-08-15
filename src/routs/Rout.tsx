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
import Visa_information from "../pages/Dashboard/UserDashboard/Application/Visa_information";
import Documents from "../pages/Dashboard/UserDashboard/Application/Documents";
import UserSupport from "../pages/Dashboard/UserSupport/UserSupport";
import VisaStatus from "../pages/Dashboard/VisaStatus/VisaStatus";
import AdminRoot from "../pages/Admin/AdminRoot/AdminRoot";
import AllAppplicatons from "../pages/Admin/AllAppplicatons/AllAppplicatons";
import ApplicationDetails from "../pages/Admin/ApplicationDetails/ApplicationDetails";
import Private from "../components/Shared/Private";

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
                element: <Private><DashBoardHome /></Private>
            },
            {
                path: '/dashboard/application',
                element: <Private><Application /></Private>,
                children: [
                    {
                        path: '/dashboard/application',
                        element: <Private><Personal_information /></Private>
                    },
                    {
                        path: '/dashboard/application/2',
                        element: <Private><Travel_information /></Private>
                    },
                    {
                        path: '/dashboard/application/3',
                        element: <Private><Visa_information /></Private>
                    },
                    {
                        path: '/dashboard/application/4',
                        element: <Private><Documents /></Private>
                    },

                ]
            },
            {
                path: '/dashboard/support',
                element: <UserSupport />
            },
            {
                path: '/dashboard/visa-status',
                element: <VisaStatus />
            },
            {
                path: '/dashboard/users',
                element: <Users />
            },
        ]
    },
    {
        path: '/admin',
        element: <Private><AdminRoot /></Private>,
        children: [
            {
                path: '/admin/applications',
                element: <Private><AllAppplicatons /></Private>
            },
            {
                path: '/admin/applications/:id',
                element: <Private><ApplicationDetails /></Private>
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