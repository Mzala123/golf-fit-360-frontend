import {useEffect, useState} from "react";
import {getOneCustomer} from "../../api/endpoints.js";
import {toast} from "sonner";
import useSession from "../../state/useSession.js";
import Button from "../../components/ui/Button.jsx";
import {useNavigate} from "react-router-dom";

function MyProfile() {


    const [customer, setCustomer] = useState({});
    const {session, setSession} = useSession( s=>s);
    const navigate = useNavigate();
    const customerId = session.customer.customerid

    function handleGetCustomerDetails(){
        getOneCustomer(customerId).then(response=>{
            const customerData = response.data
            setCustomer(customerData)
            console.log(customerData);
        }).catch(err=>{
            toast.error(err.message)
        }).finally(() =>{

        })
    }

    function handleClickEditBtn(customerId){
        console.log(customerId)
        navigate(`/system/customer/edit_customer_profile/${customerId}/`)
    }

    useEffect(()=>{
        handleGetCustomerDetails()
    },[])

    return <div className="container py-4 px-4 flex flex-col gap-4">
            <div>
                <h1 className="font-Poppins_Bold text-2xl">My Profile</h1>
            </div>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {Object.keys(customer)
                    .filter((key) => key !== "userid" && key !== "customerid") // Exclude specific keys
                    .map((key) => (
                        <div key={key} className="">
                            <p className="font-Poppins_Bold text-lg capitalize">{key}</p>
                            <span className="text-sm">{customer[key]}</span>
                        </div>
                    ))}
            </div>
           <div className="flex justify-end">
               <Button onClick={()=>{handleClickEditBtn(customer.customerid)}}>Edit customer</Button>
           </div>
    </div>
}

export default MyProfile;