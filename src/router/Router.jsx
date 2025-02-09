import {createBrowserRouter, Navigate} from "react-router-dom";
import LayoutMain from "../components/layout/LayoutMain.jsx";
import React from "react";
import SuspendedPage from "../components/SuspendedPage.jsx";

const Login = React.lazy(() => import("../components/auth/Login.jsx"));
const Register = React.lazy(() => import("../components/auth/Register.jsx"));
const CustomerList = React.lazy(() => import("../pages/admin/CustomerList.jsx"));
const HomeGolf = React.lazy(() => import("../pages/admin/HomeGolf.jsx"));
const GettingStarted = React.lazy(() => import("../pages/admin/GettingStarted.jsx"));
const FittingRequests = React.lazy(() => import("../pages/admin/FittingRequests.jsx"));
const FittingTasks = React.lazy(() => import("../pages/admin/FittingTasks.jsx"));
const FittingSchedule = React.lazy(() => import("../pages/admin/FittingSchedule.jsx"));
const FittingHistory = React.lazy(() => import("../pages/admin/FittingHistory.jsx"));
const EditGettingStartedMessage = React.lazy(() => import("../pages/admin/EditGettingStartedMessage.jsx"));
const PerformFittingTasks = React.lazy(() => import("../pages/admin/PerformFittingTasks.jsx"));
const UpdateCustomer = React.lazy(() => import("../pages/admin/UpdateCustomer.jsx"));

const HomeCustomer = React.lazy(() => import("../pages/customer/HomeCustomer.jsx"));
const GettingStartedCustomer = React.lazy(() => import("../pages/customer/GettingStartedCustomer.jsx"));
const ScheduleSwingAnalysis = React.lazy(() => import("../pages/customer/ScheduleSwingAnalysis.jsx"));
const ScheduleFitting = React.lazy(() => import("../pages/customer/ScheduleFitting.jsx"));
const FittingProgress = React.lazy(() => import("../pages/customer/FittingProgress.jsx"));
const AccountHistory = React.lazy(() => import("../pages/customer/AccountHistory.jsx"));
const MyProfile = React.lazy(() => import("../pages/customer/MyProfile.jsx"));
const ViewFittingProgress = React.lazy(() => import("../pages/customer/ViewFittingProgress.jsx"));
const EditCustomerProfile = React.lazy(() => import("../pages/customer/EditCustomerProfile.jsx"));

const routes = createBrowserRouter(
    [
        {
            path:'/',
            element: <SuspendedPage page={<Login/>}/>
        },
        {
            path:'/register',
            element:  <SuspendedPage page={<Register/>}/>
        },
        {
            path:'/system',
            element:  <SuspendedPage page={<LayoutMain/>}/>,
            children:[
                {
                    path:"",
                    element: <Navigate to={'/'}/>
                },
                {
                    path:'admin',
                    children:[
                        {
                            path:'',
                            element: <Navigate to={'/system/admin/home'}/>
                        },
                        {
                            path:'home',
                            element:  <SuspendedPage page={<HomeGolf/>}/>
                        },
                        {
                            path:'getting_started',
                            element:  <SuspendedPage page={<GettingStarted/>}/>
                        },
                        {
                            path:'fitting_requests',
                            element:  <SuspendedPage page={<FittingRequests/>}/>
                        },
                        {
                            path:'fitting_tasks',
                            element:  <SuspendedPage page={<FittingTasks/>}/>
                        },
                        {
                            path:'fitting_schedule',
                            element:  <SuspendedPage page={<FittingSchedule/>}/>
                        },
                        {
                            path:'fitting_history',
                            element:  <SuspendedPage page={<FittingHistory/>}/>
                        },
                        {
                            path:'customer_profiles',
                            element:  <SuspendedPage page={<CustomerList/>}/>
                        },
                        {
                            path:'edit_customer/:id',
                            element:  <SuspendedPage page={<UpdateCustomer/>}/>
                        },
                        {
                            path:'perform_fitting_task/:id',
                            element:  <SuspendedPage page={<PerformFittingTasks/>}/>
                        },
                        {
                            path:'edit_getting_started_message/:id',
                            element:  <SuspendedPage page={<EditGettingStartedMessage/>}/>
                        },
                    ]
                },
                {
                    path:'customer',
                    children:[
                        {
                            path:'',
                            element: <Navigate to={'/system/customer/home'}/>
                        },
                        {
                            path:'home',
                            element:  <SuspendedPage page={<HomeCustomer/>}/>
                        },
                        {
                            path:'getting_started',
                            element:  <SuspendedPage page={<GettingStartedCustomer/>}/>
                        },
                        {
                            path:'schedule_swing_analysis',
                            element:  <SuspendedPage page={<ScheduleSwingAnalysis/>}/>
                        },
                        {
                            path:'schedule_fitting',
                            element:  <SuspendedPage page={<ScheduleFitting/>}/>
                        },
                        {
                            path:'fitting_progress',
                            element:  <SuspendedPage page={<FittingProgress/>}/>
                        },
                        {
                            path:'view_fitting_progress/:id',
                            element:  <SuspendedPage page={<ViewFittingProgress/>}/>
                        },
                        {
                            path:'account_history',
                            element:  <SuspendedPage page={<AccountHistory/>}/>
                        },
                        {
                            path:'my_profile',
                            element:  <SuspendedPage page={<MyProfile/>}/>
                        },
                        {
                            path:'edit_customer_profile/:id',
                            element:  <SuspendedPage page={<EditCustomerProfile/>}/>
                        },
                    ]
                }
            ]
        }

    ]
)

export default routes