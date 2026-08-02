import { Navigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../utils/auth";

function ProtectedRoute({ children, role }) {

    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    if (role && getUserRole() !== role) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;