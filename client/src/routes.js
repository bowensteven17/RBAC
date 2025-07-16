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
        path : "settings/rbac",
        element : (
            <ProtectedRoute requiredFeature="admin" requiredSubFeature="roles">
                <RBACSettings/>
            </ProtectedRoute>
        )
    },
    // Add more protected routes as needed
    {
        path : "dashboard",
        element : (
            <ProtectedRoute requiredFeature="home" requiredSubFeature="dashboard">
                <Main/>
            </ProtectedRoute>
        )
    },
    {
        path : "users",
        element : (
            <ProtectedRoute requiredFeature="users" requiredSubFeature="all-users">
                <div>Users Management Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "users/add",
        element : (
            <ProtectedRoute requiredFeature="users" requiredSubFeature="add-user">
                <div>Add User Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "admin",
        element : (
            <ProtectedRoute requiredFeature="admin">
                <div>Admin Dashboard</div>
            </ProtectedRoute>
        )
    },
    {
        path : "admin/users",
        element : (
            <ProtectedRoute requiredFeature="admin" requiredSubFeature="users">
                <div>Admin User Management</div>
            </ProtectedRoute>
        )
    },
    {
        path : "settings",
        element : (
            <ProtectedRoute requiredFeature="settings">
                <div>Settings Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "settings/profile",
        element : (
            <ProtectedRoute requiredFeature="settings" requiredSubFeature="profile">
                <div>Profile Settings</div>
            </ProtectedRoute>
        )
    },
    {
        path : "analytics",
        element : (
            <ProtectedRoute requiredFeature="visualize" requiredSubFeature="analytics">
                <div>Analytics Dashboard</div>
            </ProtectedRoute>
        )
    },
    {
        path : "reports",
        element : (
            <ProtectedRoute requiredFeature="visualize" requiredSubFeature="reports">
                <div>Reports Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "config",
        element : (
            <ProtectedRoute requiredFeature="config">
                <div>Configuration Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "discover",
        element : (
            <ProtectedRoute requiredFeature="discover">
                <div>Discover Page</div>
            </ProtectedRoute>
        )
    },
    {
        path : "chat",
        element : (
            <ProtectedRoute requiredFeature="conversational" requiredSubFeature="chat">
                <div>Chat Interface</div>
            </ProtectedRoute>
        )
    }
]

export default routes;