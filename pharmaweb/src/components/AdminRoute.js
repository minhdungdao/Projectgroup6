// AdminRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ authData }) => {
    if (!authData) return null; // hoặc loading spinner

    if (!authData.isAuthenticated || authData.data?.role !== 'Admin') {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;
