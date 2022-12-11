import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    const access = localStorage.getItem('authTokens');

    return (
        access
            ? <Outlet />
            //: auth?.accessToken //changed from user to accessToken to persist login after refresh
            //    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;