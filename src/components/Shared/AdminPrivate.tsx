import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../Redux/Store";
import moment from "moment";
import 'moment/dist/locale/de';
import 'moment/dist/locale/zh-cn';
import 'moment/dist/locale/en-gb';
import 'moment/dist/locale/fr';
import 'moment/dist/locale/de';


export default function AdminPrivate({ children }: { children: React.ReactNode }) {
    const userInfo = useSelector((state: RootState) => state.user);
    const location = useLocation();
    moment.locale(userInfo?.local);

    if (userInfo?.email && userInfo?.fullName && userInfo?.isVerified && userInfo?.isAuthonicated && userInfo?.isAdmin) {
        return children;
    }
    return <Navigate state={{ from: location.pathname }} to="/admin/login" replace></Navigate>
}
