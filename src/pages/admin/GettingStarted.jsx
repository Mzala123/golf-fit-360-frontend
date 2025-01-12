import {useEffect, useState} from "react";
import {getStartedMessage} from "../../api/endpoints.js";
import Button from "../../components/ui/Button.jsx";
import {Pencil} from "lucide-react";
import {useNavigate} from "react-router-dom";

function GettingStarted() {

    const navigate = useNavigate();
    const[gettingStarted, settingStarted] = useState({})


    function handleGettingStarted() {
        getStartedMessage().then((response) => {
            console.log(response.data)
            settingStarted(response.data)
        })
    }

    function handleEditGettingStarted(id){
        console.log(id)
        navigate(`/system/admin/edit_getting_started_message/${id}`)
    }

    useEffect(() => {
        handleGettingStarted();
    },[])


    return (
        <div className="flex flex-1 justify-center items-center flex-col px-4">
            <div className="flex flex-col gap-4 justify-center">
                <p className="font-Martian text-2xl leading-loose text-center">{gettingStarted.message} </p>
            </div>
            <Button onClick={()=>{handleEditGettingStarted(gettingStarted.messageid)}}>
                <Pencil size={20} />
               <span>Edit</span>
            </Button>
        </div>
    )
}

export default GettingStarted;