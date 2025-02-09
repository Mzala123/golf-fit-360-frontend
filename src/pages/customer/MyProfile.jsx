import {getOneCustomer} from "../../api/endpoints.js";
import useSession from "../../state/useSession.js";
import Button from "../../components/ui/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

function MyProfile() {


    const {session} = useSession( s=>s);
    const navigate = useNavigate();
    const customerId = session.customer.customerid



    const {data, isLoading, isError} = useQuery({
        queryKey: ["getting-started", customerId],
        enabled: !!customerId,
        queryFn: async () => {
            const response = await getOneCustomer(customerId);
            return response.data;
        }
    })

    console.log(data)


    function handleClickEditBtn(customerId){
        console.log(customerId)
        navigate(`/system/customer/edit_customer_profile/${customerId}/`)
    }


    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Failed to load profile.</p>;

    return <div className="container py-4 px-4 flex flex-col gap-4">
            <div>
                <h1 className="font-Poppins_Bold text-2xl">My Profile</h1>
            </div>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {Object.keys(data)
                    .filter((key) => key !== "userid" && key !== "customerid")
                    .map((key) => (
                        <div key={key} className="">
                            <p className="font-Poppins_Bold text-lg capitalize">{key}</p>
                            <span className="text-sm">{data[key]}</span>
                        </div>
                    ))}
            </div>
           <div className="flex justify-end">
               <Button onClick={()=>{handleClickEditBtn(data?.customerid)}}>Edit customer</Button>
           </div>
    </div>
}

export default MyProfile;