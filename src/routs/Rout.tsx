import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home'
import Root from "../pages/Root/Root";
import RootDashboard from "../pages/Dashboard/RootDashboard/RootDashboard";
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
import AdminHome from "../pages/Admin/AdminHome/AdminHome";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import MyApplicationDetails from "../pages/Dashboard/MyApplicationDetails/MyApplicationDetails";
import Settings from "../pages/Admin/Settings/Settings";
import TimeZone from "../pages/Admin/Settings/TimeZone/TimeZone";
import LoginAdmin from "../pages/Admin/Login/Login";
import AdminPrivate from "../components/Shared/AdminPrivate";
import SuccessApplication from "../pages/Dashboard/SuccessApplication/SuccessApplication";
// import InterViewSchedules from "../pages/Admin/InterViewSchedules/InterViewSchedules";
import InterviewScheduleCalander from "../pages/Admin/InterViewSchedules/InterviewScheduleCalander";
import ReviewApplication from "../pages/Dashboard/UserDashboard/Application/ReviewApplication";
import EditApplication from "../pages/Dashboard/EditApplication/EditApplication";

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
        element: <Private><RootDashboard /></Private>,
        children: [
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
                    {
                        path: '/dashboard/application/5',
                        element: <Private><ReviewApplication /></Private>
                    }
                ]
            },
            {
                path: '/dashboard/support',
                element: <Private><UserSupport /></Private>
            },
            {
                path: '/dashboard/visa-status',
                element: <Private><VisaStatus /></Private>
            },
            {
                path: '/dashboard/users',
                element: <Private><Users /></Private>
            },
            {
                path: '/dashboard/my-applications',
                element: <Private><MyApplications /></Private>
            },
            {
                path: '/dashboard/my-applications/:id',
                element: <Private><MyApplicationDetails /></Private>
            },
            {
                path: '/dashboard/my-applications/:id/success',
                element: <Private><SuccessApplication /></Private>
            },
            {
                path: '/dashboard/settings',
                element: <Private><Settings /></Private>,
                children:
                    [
                        {
                            path: '/dashboard/settings/timezone',
                            element: <Private><TimeZone /></Private>
                        }
                    ]
            },
        ]
    },
    {
        path: '/applications/:id/edit',
        element: <Private><EditApplication /></Private>
    },
    {
        path: '/admin',
        element: <AdminPrivate><AdminRoot /></AdminPrivate>,
        children: [
            {
                path: '/admin',
                element: <AdminPrivate><AdminHome /></AdminPrivate>
            },
            {
                path: '/admin/applications',
                element: <AdminPrivate><AllAppplicatons /></AdminPrivate>
            },
            {
                path: '/admin/applications/:id',
                element: <AdminPrivate><ApplicationDetails /></AdminPrivate>
            },
            {
                path: '/admin/interview_schedules',
                element: <AdminPrivate><InterviewScheduleCalander /></AdminPrivate>
            },
            {
                path: '/admin/settings',
                element: <AdminPrivate><Settings /></AdminPrivate>,
                children:
                    [
                        {
                            path: '/admin/settings/timezone',
                            element: <AdminPrivate><TimeZone /></AdminPrivate>
                        }
                    ]
            },
        ]
    },
    {
        path: '/admin/login',
        element: <LoginAdmin />
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