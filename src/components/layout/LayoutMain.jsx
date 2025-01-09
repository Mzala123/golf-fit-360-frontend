import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useMemo, useState} from "react";
import useSession from "../../state/useSession.js";
import {getCookie} from "../../lib/utils.js";
import Banner from "./Banner.jsx";
import SideBar from "./SideBar.jsx";
import {Menu} from "lucide-react";


function LayoutMain() {


    const location = useLocation();
    const{session} = useSession(s=>s)

    const [isOpen, setIsOpen] = useState(false);

    function handleCloseMenu(){
        setIsOpen(false);
    }

    function handleOpenMenu(){
        setIsOpen(true);
    }

    const isAuthenticated = useMemo(() => {
        const token = getCookie("access_token");
         if(session && session.user && token ){
            return true
         }else{
             return false;
         }
    }, [location.pathname, session]);

    if(!isAuthenticated){
        return <Navigate to={'/?error= You must be logged in to access this page'}/>
    }

    {/*welcome {session.user.usertype}*/}
    {/*{getAccountName(session)}*/}

    return(
        <div className="h-screen w-full flex flex-col relative">
            <Banner/>
            <div className="w-full flex flex-1 top-24">
                <SideBar isOpen={isOpen} handleCloseMenu={handleCloseMenu}/>
                <div className="flex-1 w-full relative lg:w-[75%]">
                    <button className="bg-white size-10 flex justify-center items-center transition-all absolute top-3 left-3 hover:bg-slate-200 rounded-full lg:hidden"
                        onClick={handleOpenMenu}>
                        <Menu size={24}/>
                    </button>
                    <div className="mt-14 px-5 lg:mt-0 lg:px-0">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutMain;