import Button from "../ui/Button.jsx";
import PageLoader from "../ui/PageLoader.jsx";
import {useMemo, useState} from "react";
import InputField from "../form/InputField.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginUser} from "../../api/endpoints.js";
import {toast} from "sonner";
import queryToStringObject from "../../lib/utils.js";
function Login() {

    const navigate = useNavigate();
    const query = useLocation()

    const{message, type} = queryToStringObject(query.search)

    const loginFields = useMemo(()=>(
        [
            {
                name:"username",
                value:"",
                placeholder:"Enter username",
                type:'email',
                label:"Username",
                required:true,
                width: 12
            },
            {
                name:"password",
                value:"",
                placeholder:"Enter your password",
                type:'password',
                label:"Password",
                required:true,
                width: 12
            }
        ]
    ),[])

    const[fields, setFields] = useState(loginFields)

        const validateField = (field) => {
            if (field.required && !field.value.trim()) {
                return `${field.label} is required`;
            }

            if (field.type === "email" && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    return "Please enter a valid email address";
                }
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            const updatedFields = fields.map((field) =>
                field.name === name
                    ? {
                        ...field,
                        value: value,
                        error: validateField({ ...field, value })
                    }
                    : field
            );
            setFields(updatedFields);
        };

    function handleLogin(formData){
        loginUser(formData).then(response=>{
            localStorage.setItem('golf_token',response.data.token);
            toast.success("User authenticated successfully!");
            console.log(response.data);
        }).catch(error=>{
            toast.error(`${error.response.data.message}`);
        }).finally(()=>{

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFields = fields.map((field) => ({
            ...field,
            error: validateField(field),
        }));
        setFields(updatedFields);

        const hasErrors = updatedFields.some((field) => field.error);
        if (hasErrors) return;

        const formData = fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});

        console.log(formData)// This function will handle the login logic
        handleLogin(formData)
    };



    return (
        <div className="bg-white h-screen flex justify-center items-center">
            <div className="flex">
                {/*<div className="bg-pink-300">*/}
                {/*    hello*/}
                {/*</div>*/}
                <div className="flex gap-4 flex-col p-4 rounded-md w-[480px]">
                    <h1 className="text-lg font-Martian text-center font-semibold">GolfFit-360</h1>
                    {message && message}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <InputField
                                    name={field.name}
                                    onChange={handleChange}
                                    value={field.value}
                                    label={field.label}
                                    required={field.required}
                                    type={field.type}
                                    error={field.error}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                        <Button type="submit" variant="primary">Login</Button>
                    </form>
                    <div className="flex gap-2 mt-3 text-sm justify-center">
                        <span className="text-gray-600 ">Don't have a customer account?</span>
                        <Link className="text-blue-600 underline" to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

