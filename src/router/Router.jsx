import {createBrowserRouter} from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import LayoutMain from "../components/layout/LayoutMain.jsx";
import Register from "../components/auth/Register.jsx";
import CustomerList from "../pages/admin/CustomerList.jsx";
import HomeGolf from "../pages/admin/HomeGolf.jsx";
import GettingStarted from "../pages/admin/GettingStarted.jsx";
import FittingRequests from "../pages/admin/FittingRequests.jsx";
import FittingTasks from "../pages/admin/FittingTasks.jsx";
import FittingSchedule from "../pages/admin/FittingSchedule.jsx";
import FittingHistory from "../pages/admin/FittingHistory.jsx";
import HomeCustomer from "../pages/customer/HomeCustomer.jsx";
import GettingStartedCustomer from "../pages/customer/GettingStartedCustomer.jsx";
import ScheduleSwingAnalysis from "../pages/customer/ScheduleSwingAnalysis.jsx";
import ScheduleFitting from "../pages/customer/ScheduleFitting.jsx";
import FittingProgress from "../pages/customer/FittingProgress.jsx";
import AccountHistory from "../pages/customer/AccountHistory.jsx";
import MyProfile from "../pages/customer/MyProfile.jsx";
import UpdateCustomer from "../pages/admin/UpdateCustomer.jsx";
import PerformFittingTasks from "../pages/admin/PerformFittingTasks.jsx";
import ViewFittingProgress from "../pages/customer/ViewFittingProgress.jsx";
import EditCustomerProfile from "../pages/customer/EditCustomerProfile.jsx";
import EditGettingStartedMessage from "../pages/admin/EditGettingStartedMessage.jsx";


const routes = createBrowserRouter(
    [
        {
            path:'/',
            element: <Login/>
        },
        {
            path:'/register',
            element: <Register/>
        },
        {
            path:'/system',
            element: <LayoutMain/>,
            children:[
                {
                    path:'admin',
                    children:[
                        {
                            path:'home',
                            element: <HomeGolf/>
                        },
                        {
                            path:'getting_started',
                            element: <GettingStarted/>
                        },
                        {
                            path:'fitting_requests',
                            element: <FittingRequests/>
                        },
                        {
                            path:'fitting_tasks',
                            element: <FittingTasks/>
                        },
                        {
                            path:'fitting_schedule',
                            element: <FittingSchedule/>
                        },
                        {
                            path:'fitting_history',
                            element: <FittingHistory/>
                        },
                        {
                            path:'customer_profiles',
                            element: <CustomerList/>
                        },
                        {
                            path:'edit_customer/:id',
                            element: <UpdateCustomer/>
                        },
                        {
                            path:'perform_fitting_task/:id',
                            element: <PerformFittingTasks/>
                        },
                        {
                            path:'edit_getting_started_message/:id',
                            element: <EditGettingStartedMessage/>
                        },
                    ]
                },
                {
                    path:'customer',
                    children:[
                        {
                            path:'home',
                            element: <HomeCustomer/>
                        },
                        {
                            path:'getting_started',
                            element: <GettingStartedCustomer/>
                        },
                        {
                            path:'schedule_swing_analysis',
                            element: <ScheduleSwingAnalysis/>
                        },
                        {
                            path:'schedule_fitting',
                            element: <ScheduleFitting/>
                        },
                        {
                            path:'fitting_progress',
                            element: <FittingProgress/>
                        },
                        {
                            path:'view_fitting_progress/:id',
                            element: <ViewFittingProgress/>
                        },
                        {
                            path:'account_history',
                            element: <AccountHistory/>
                        },
                        {
                            path:'my_profile',
                            element: <MyProfile/>
                        },
                        {
                            path:'edit_customer_profile/:id',
                            element: <EditCustomerProfile/>
                        },
                    ]
                }
            ]
        }

    ]
)

export default routes