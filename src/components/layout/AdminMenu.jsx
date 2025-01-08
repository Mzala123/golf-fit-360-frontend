import {CalendarClock, Flag, FlagTriangleRight, Goal, History, Home, Users} from 'lucide-react'

export const adminMenu = [
    {
        title: 'Home',
        icon: <Home size={18}/>,
        path: '/system/admin/home',
    },
    {
        title: 'Getting Started',
        icon: <Flag size={18}/>,
        path: '/system/admin/getting_started'
    },
    {
        title: 'Fitting Requests',
        icon: <FlagTriangleRight size={18}/>,
        path: '/system/admin/fitting_requests'
    },
    {
        title: 'Fitting Tasks',
        icon: <Goal size={18}/>,
        path: '/system/admin/fitting_tasks'
    },
    {
        title: 'Fitting Schedule',
        icon: <CalendarClock size={18}/>,
        path: '/system/admin/fitting_schedule'
    },
    {
        title: 'Fitting History',
        icon: <History size={18}/>,
        path: '/system/admin/fitting_history'
    },
    {
        title: 'Customer Profiles',
        icon: <Users size={18}/>,
        path: '/system/admin/customer_profiles'

    }
]