import {getStartedMessage} from "../../api/endpoints.js";
import Button from "../../components/ui/Button.jsx";
import {Pencil} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import useSession from "../../state/useSession.js";

function GettingStarted() {

    const navigate = useNavigate();
    const {session} = useSession( s=>s);

    const {data} = useQuery({
        queryKey: ["getting-started"],
        queryFn: async () => {
            const response = await getStartedMessage();
            return response.data;
        }
    })


    function handleEditGettingStarted(id){
        navigate(`/system/admin/edit_getting_started_message/${id}`)
    }


    return (
        <div className="flex flex-1 justify-center items-center flex-col px-4">
            <div className="flex flex-col gap-4 justify-center">
                <p className="font-Martian text-2xl leading-loose text-center">{data?.message} </p>
            </div>

            {
                session.user.usertype === "ADMIN" ? (
                    <Button onClick={()=>{handleEditGettingStarted(data?.messageid)}}>
                        <Pencil size={20} />
                        <span>Edit</span>
                    </Button>
                ) : ""
            }
        </div>
    )
}

export default GettingStarted;