import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./pages/Main";



const routes = [
    {
        path : "/",
        element : <Main/>
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