import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import RBACSettings from "./components/RBACSettings";

const routes = [
    {
        path : "/",
        element : (
            <ProtectedRoute>
                <Main/>
            </ProtectedRoute>
        )
    },
    {
        path : "login",
        element : <Login/>
    },
    {
        path : "register",
        element : <Register/>
    },
    {
        path : "settings/rbac",  // ADD THIS
        element : <RBACSettings/>
    },
]

export default routes;