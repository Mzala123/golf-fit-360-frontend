import {useMemo} from "react";
import FormBuilder from "../form/FormBuilder.jsx";
import {registerCustomer} from "../../api/endpoints.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

function Register() {

    const navigate = useNavigate();

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

    const customerForm  = useMemo(()=>(
        [
            {
                name:"firstName",
                value:"",
                placeholder:"Enter customer first name",
                type:'text',
                label:"Firstname",
                required:true,
                width: 6
            },
            {
                name:"lastName",
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
                width: 12
            },
            {
                name:"password",
                value:"",
                placeholder:"Enter customer password",
                type:'password',
                label:"Password",
                required:true,
                width: 12
            },
            {
                name:"phoneNumber",
                value:"",
                placeholder:"Enter customer phone number",
                type:'text',
                label:"Phone number",
                required:false,
                width: 12
            },
            {
                name:"gender",
                value:"",
                placeholder:"Enter customer gender",
                type:'select',
                label:"Gender",
                required:false,
                width: 12,
                options:genderOptions
            },
            {
                name:"golfClubSize",
                value:"",
                placeholder:"Enter golf club size",
                type:'select',
                label:"Golf club size",
                required:false,
                width: 12,
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


    function handleSubmit(formData) {
        console.log(formData)
        registerCustomer(formData).then(response=>{
            toast.success(response.data.message);
            navigate("/?message=Your customer account was registered successfully. Please login");
        }).catch(error=>{
            toast.error(error.response.data.message);
        }).finally(()=>{

        })
    }

    return (
        <div className="container mx-auto px-4 mt-10">
            <FormBuilder
                formFields={customerForm}
                formTitle={"Create Customer Account"}
                onSubmit={handleSubmit}
            />
        </div>
    )

}

export default Register;