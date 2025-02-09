import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {readOneGolfClubMessage, updateGolfClubMessage} from "../../api/endpoints.js";
import {toast} from "sonner";
import PageLoader from "../../components/ui/PageLoader.jsx";
import FormBuilder from "../../components/form/FormBuilder.jsx";

function EditGettingStartedMessage() {
    const navigate = useNavigate();
    const params = useParams();
    const id  = params.id
    const[formFields, setFormFields] = useState([]);
    const[isLoading, setIsLoading] = useState(true);


    const gettingStartedForm  = useMemo(()=>(
        [
            {
                name:"message",
                value:"",
                placeholder:"Enter getting started message",
                type:'textarea',
                label:"Getting started message",
                required:true,
                width: 12
            },

        ]
    ),[])

    useEffect(()=>{
        readOneGolfClubMessage(id).then(response=>{
            const customerData = response.data
            const updatedFields = gettingStartedForm.map(field =>({
                ...field,
                value: customerData[field.name] || ""
            }))
            setFormFields(updatedFields)
        }).catch(err=>{
            toast.error(err.message)
        }).finally(() => setIsLoading(false))

    },[])

    function handleSubmit(formData){
        console.log(formData)
        updateGolfClubMessage(id, formData).then((response)=>{
            navigate(-1)
            toast.success(response.data.message);
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    if(isLoading){
        return <div className="flex gap-2">
            <span>Fetching data...</span> <PageLoader/>
        </div>
    }

    return (
        <div className="py-4 w-full">
            <FormBuilder
                formFields={formFields}
                formTitle="Update Getting Started Message"
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditGettingStartedMessage;