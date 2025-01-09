import {CalendarCog, CalendarSync, Flag, History, Home, ListTree, User} from "lucide-react";

export const customerMenu = [
    {
        title: 'Home',
        icon: <Home size={18}/>,
        path: '/system/customer/home',
    },
    {
        title: 'Getting Started',
        icon: <Flag size={18}/>,
        path: '/system/customer/getting_started',
    },
    {
        title: 'Schedule a Swing Analysis',
        icon: <CalendarSync size={18}/>,
        path: '/system/customer/schedule_swing_analysis',
    },
    {
        title: 'Schedule a Fitting',
        icon: <CalendarCog size={18}/>,
        path: '/system/customer/schedule_fitting',
    },
    {
        title: 'Fitting Progress',
        icon: <ListTree size={18}/>,
        path: '/system/customer/fitting_progress',
    },
    {
        title: 'Account History',
        icon: <History size={18}/>,
        path: '/system/customer/account_history',
    },
    {
        title: 'My Profile',
        icon: <User size={18}/>,
        path: '/system/customer/my_profile',
    }
]