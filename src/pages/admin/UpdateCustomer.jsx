import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOneCustomer, updateCustomer} from "../../api/endpoints.js";
import {toast} from "sonner";
import PageLoader from "../../components/ui/PageLoader.jsx";
import FormBuilder from "../../components/form/FormBuilder.jsx";

function UpdateCustomer() {

    const navigate = useNavigate();
    const params = useParams();
    const customerId = params.id
    const[formFields, setFormFields] = useState([]);
    const[isLoading, setIsLoading] = useState(true);


    const genderOptions =  useMemo(()=>(
        [
            {
                value: "Male",
                label: "Male"
            },
            {
                value: "Female",
                label: "Female"
            },
            {
                value: "Other",
                label: "Other"
            }
        ]
    ))

    const golfClubSizeOptions = useMemo(()=>(
        [
            {
                value: "Driver",
                label: "Driver"
            },
            {
                value: "Irons",
                label: "Irons"
            },
            {
                value: "Wedges",
                label: "Wedges"
            },
            {
                value: "Putter",
                label: "Putter"
            },

        ]
    ))

    const defaultCustomerFields  = useMemo(()=>(
        [
            {
                name:"firstname",
                value:"",
                placeholder:"Enter customer first name",
                type:'text',
                label:"Firstname",
                required:true,
                width: 6
            },
            {
                name:"lastname",
                value:"",
                placeholder:"Enter customer last name",
                type:'text',
                label:"Lastname",
                required:true,
                width: 6
            },
            {
                name:"email",
                value:"",
                placeholder:"Enter customer email",
                type:'email',
                label:"Email",
                required:true,
                width: 6
            },
            {
                name:"phonenumber",
                value:"",
                placeholder:"Enter customer phone number",
                type:'text',
                label:"Phone number",
                required:false,
                width: 6
            },
            {
                name:"gender",
                value:"",
                placeholder:"Enter customer gender",
                type:'select',
                label:"Gender",
                required:false,
                width: 6,
                options:genderOptions
            },
            {
                name:"golfclubsize",
                value:"",
                placeholder:"Enter golf club size",
                type:'select',
                label:"Golf club size",
                required:false,
                width: 6,
                options:golfClubSizeOptions
            },

            {
                name:"address",
                value:"",
                placeholder:"Enter customer address",
                type:'textarea',
                label:"Address",
                required:false,
                width: 12
            },

        ]
    ),[genderOptions, golfClubSizeOptions])

    useEffect(()=>{
        getOneCustomer(customerId).then(response=>{
            const customerData = response.data
            const updatedFields = defaultCustomerFields.map(field =>({
                ...field,
                value: customerData[field.name] || ""
            }))
            setFormFields(updatedFields)
        }).catch(err=>{
            toast.error(err.message)
        }).finally(() => setIsLoading(false))

    },[customerId, defaultCustomerFields])

    function handleSubmit(formData){
        updateCustomer(customerId, formData).then((response)=>{
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
        <div className="py-4">
            <FormBuilder
              formFields={formFields}
              formTitle="Update Customer Details"
              onSubmit={handleSubmit}
            />
        </div>
    )
}

export default UpdateCustomer;