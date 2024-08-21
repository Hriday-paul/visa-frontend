import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../Redux/Store";


export default function Private({ children }: { children: React.ReactNode }) {
    const userInfo = useSelector((state: RootState) => state.user);
    const location = useLocation();

    if (userInfo?.email && userInfo?.fullName && userInfo?.isVerified, userInfo?.isAuthonicated) {
        return children;
    }
    return <Navigate state={{ from: location.pathname }} to="/login" replace></Navigate>
}
