import {createBrowserRouter} from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import LayoutMain from "../components/layout/LayoutMain.jsx";


const routes = createBrowserRouter(
    [
        {
            path:'/',
            element: <Login/>
        },
        {
            path:'/system',
            element: <LayoutMain/>,
            children:[
                {

                }
            ]
        }

    ]
)

export default routes