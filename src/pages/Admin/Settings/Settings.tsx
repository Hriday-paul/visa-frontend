import { IoTimeOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { AppDispatch } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../Redux/Slices/UserSlice";
import { Link, Outlet, useLocation } from "react-router-dom";


export default function Settings() {
    const {pathname} = useLocation();
    const isAdmin = pathname?.includes('admin');
    const dispatch = useDispatch<AppDispatch>();

    const signOut = () => {
        dispatch(resetUser())
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 md:gap-x-5 gap-y-5 md:gap-y-0">
            <div className="col-span-2 rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-5 p-4 xl:p-6">

                <Link to={isAdmin ? '/admin/settings/timezone' : '/dashboard/settings/timezone'} className="border border-stroke dark:border-strokedark h-24 md:h-40 max-w-60 xl:max-w-full flex flex-col justify-center items-center shadow cursor-pointer">
                    <IoTimeOutline className="text-2xl md:text-3xl xl:text-4xl text-black dark:text-gray" />
                    <p className="text-center text-base md:text-lg font-medium text-black dark:text-gray my-2">Time Zone</p>
                </Link>

                <div onClick={signOut} className="border border-stroke dark:border-strokedark h-24 md:h-40 max-w-60 xl:max-w-full flex flex-col justify-center items-center shadow cursor-pointer">
                    <LuLogOut className="text-2xl md:text-3xl xl:text-4xl text-black dark:text-gray" />
                    <p className="text-center text-base md:text-lg font-medium text-black dark:text-gray my-2">Sign Out</p>
                </div>
            </div>

            <div className="col-span-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 xl:p-6 ">
                <Outlet />
            </div>
        </div>
    )
}
