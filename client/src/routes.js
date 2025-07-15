import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";

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
]

export default routes;