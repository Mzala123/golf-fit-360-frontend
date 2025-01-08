import {PanelLeft, User, X} from "lucide-react";
import PropTypes from "prop-types";
import {useMemo} from "react";
import useSession from "../../state/useSession.js";
import {adminMenu, } from "./AdminMenu.jsx";
import {customerMenu} from "./CustomerMenu.jsx";
import {Link} from "react-router-dom";
import {getAccountName} from "../../lib/utils.js";

function SideBar({handleCloseMenu, isOpen}) {

    const {session} = useSession( s=>s);

    const menus = useMemo(()=>{
          if(session.user.usertype === "ADMIN"){
              return adminMenu
          }else if(session.user.usertype === "CUSTOMER"){
              return customerMenu
          }
          return [];

    },[session.user])

    return (
        <div className={`bg-white min-w-72 w-96 fixed top-0 bottom-0 z-20  flex transition-all shadow-md lg:border-r lg:border-slate-300 ${isOpen ? "left-0" : "-left-96"} lg:left-0 lg:shadow-none lg:w-[25%] lg:relative`}>
            <div className={"flex flex-1 flex-col justify-between w-full"}>
                <div className={"flex-1 w-full  flex flex-col gap-4"}>
                    <div className="px-3 pt-3 border-b pb-4 flex justify-center items-center relative">
                        <img className="h-20" src="images/golflogo.png" alt=""/>
                        <button className="size-10 flex justify-center items-center transition-all absolute top-3 right-3 hover:bg-slate-200 rounded-full lg:hidden" onClick={handleCloseMenu}>
                            <X size={24}/>
                        </button>

                    </div>
                    <div className="px-2">
                        {
                            menus.map((menu)=> {
                               return <Link  key={menu.path} to={menu.path} className={`flex gap-4 items-center p-2 px-4 hover:text-white hover:rounded-lg hover:border-blue-700 hover:bg-green-600`}>
                                      <span>{menu.icon}</span>{menu.title} </Link>
                            })
                        }
                    </div>
                </div>
                <div className={"px-3 w-full py-3 flex gap-3 items-center"}>
                    <User size={18} /> {getAccountName(session)}
                </div>
            </div>

        </div>
    )
}

SideBar.propTypes = {
    handleCloseMenu: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default SideBar;