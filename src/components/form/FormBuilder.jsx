import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import InputField from "./InputField.jsx";
import Button from "../ui/Button.jsx";
import {useNavigate} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import SelectField from "./SelectField.jsx";
import TextArea from "./TextArea.jsx";
import TimeField from "./TimeField.jsx";


function FormBuilder({onSubmit, formFields=[] , formTitle="",  wizardMode = false, currentStep = 1,
                         totalSteps = 1, onNext, onBack, steps = [], setFormData}) {

    const [fields, setFields] = useState(formFields.map((field)=>{
        return {
            ...field,
            value: field.value || "",
        }
    }));

    // const [fields, setFields] = useState([])

    // const [formDataObj, setFormDataObj] = useState({});
    const[isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [canProceed, setCanProceed] = useState(false);


    useEffect(() => {
        setFields(
            formFields.map((field) => ({
                ...field,
                value: field.value || "",
            }))
        );
    }, [formFields]);

    // const validateCurrentField = () => {
    //     const currentField = fields[currentStep - 1]; // Get the currently displayed field based on the step
    //     if (currentField.required && currentField.value.trim() === "") {
    //         setCanProceed(false);
    //     } else {
    //         setCanProceed(true);
    //     }
    // };


    const validateCurrentField = () => {
        const currentField = fields[currentStep - 1]; // Get the currently displayed field based on the step
        if (currentField && currentField.required) {
            // Only check if the field is required and its value is empty
            if (currentField.value.trim() === "") {
                setCanProceed(false);
            } else {
                setCanProceed(true);
            }
        } else {
            setCanProceed(true); // If not required, always allow proceed
        }
    };


    useEffect(() => {
        validateCurrentField(); // Call validate when currentStep changes
    }, [currentStep, fields]);


    function validateField(field){
        if(field.required && !field.value.trim()){
            return `${field.name || field.label} is required`;
        }

        if(field.type === "number" && field.value.trim()){
            if(isNaN(field.value)){
                return `Please enter a valid number`;
            }
        }

        if(field.type === 'email' && field.value.trim()){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(field.value)){
                return `Please enter a valid email address`;
            }
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        // console.log(name);
        const updatedFields = fields.map((field)=>{
            return field.name === name ?
                {...field,
                    value: value,
                    error: validateField({...field,value})
                } : field
        })
        setFields(updatedFields)

        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update only the changed field in formData
        }));


    }

    function handleSubmit(e) {
        e.preventDefault();

        if (wizardMode && currentStep < totalSteps) {
            return;
        }

        const updatedFields = fields.map((field) => ({
            ...field,
            error: validateField(field),
        }));
        setFields(updatedFields);

        console.log("Updated fields after validation:", updatedFields);
        const hasErrors = updatedFields.some((field) => field.error);
        if (hasErrors) {
            console.error("Form validation failed. Fix errors before submitting.")
            return;
        }


        setIsSubmitting(true)
        const formData = fields.reduce((acc, field)=>{
            acc[field.name] = field.value;
            return acc;
        }, {})
        console.log("Form submitted with data:", formData);

        if (setFormData) {
            setFormData(formData);  // Only called if setFormData is provided
        }

        onSubmit(formData)

    }

    function handleClear(e) {
        e.preventDefault();
        const clearedFields = fields.map((field)=>{
            return {
                ...field,
                value: "",
                error: "",
            }
        })
        setFields(clearedFields)
    }

    function getSize(size){
        switch(size){
            case 1:
                return `col-span-12 md:col-span-1`
            case 2:
                return `col-span-12 md:col-span-2`
            case 3:
                return `col-span-12 md:col-span-3`
            case 4:
                return `col-span-12 md:col-span-4`
            case 5:
                return `col-span-12 md:col-span-5`
            case 6:
                return `col-span-12 md:col-span-6`
            case 7:
                return `col-span-12 md:col-span-7`
            case 8:
                return `col-span-12 md:col-span-8`
            case 9:
                return `col-span-12 md:col-span-9`
            case 10:
                return `col-span-12 md:col-span-10`
            case 11:
                return `col-span-12 md:col-span-11`
            case 12:
                return `col-span-12 md:col-span-12`

        }
       //return `col-span-12 md:col-span-${Math.min(size, 12)}`
    }


    return(
        //lg:mx-2 its in the main div yah
        <div className="mt-3 container mx-auto w-auto lg:w-[700px]">
            <div className="flex gap-2 mb-6">
                <ChevronLeft className={"size-8 hover:rounded-full hover:cursor-pointer hover:bg-slate-200"} onClick={()=>navigate(-1)} />
                <p className="text-3xl font-Poppins_Bold">{formTitle}</p>
            </div>
            {wizardMode && steps.length > 0 && (
                <div className="flex justify-between items-center mb-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.key}
                            className={`flex-1 text-center ${
                                index + 1 === currentStep
                                    ? "text-green-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <span
                                className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
                                    index + 1 === currentStep
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {index + 1}
                            </span>
                            <p className="text-sm mt-2">{step.label}</p>
                        </div>
                    ))}
                </div>
            )}
            <form className="grid grid-cols-12 gap-6" onSubmit={handleSubmit}>
                {
                    fields.map((field) => {
                        switch (field.type) {
                            case "text":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <InputField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "password":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <InputField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "email":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <InputField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "number":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <InputField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "date":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <InputField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "time":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <TimeField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        error={field.error}
                                    />
                                </div>
                            case "select":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <SelectField
                                        name={field.name}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        required={field.required}
                                        isSubmitting={isSubmitting}
                                        type={field.type}
                                        options={field.options}
                                        error={field.error}
                                    />
                                </div>
                            case "textarea":
                                return <div key={field.name} className={`${getSize(field.width)}`}>
                                    <TextArea
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        value={field.value}
                                        label={field.label}
                                        name={field.name}
                                        required={field.required}
                                        type={field.type}
                                        isSubmitting={isSubmitting}
                                        cols={field.cols}
                                        rows={field.rows}
                                        error={field.error}
                                    />
                                </div>

                            default: return "Invalid field type " + field.type
                        }
                    })
                }
                <div className="flex col-span-12 justify-end mt-2 gap-2">
                    {
                        wizardMode ? (
                                <>
                                    {currentStep > 1 && (
                                        <Button type="button" className="btn" onClick={onBack}>
                                            Back
                                        </Button>
                                    )}
                                    {currentStep < totalSteps ? (
                                        <Button type="button" className="btn"
                                                onClick={onNext}
                                                isDisabled={!canProceed}
                                                variant={canProceed ? "primary" : "secondary"}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button className={"col-span-6"}  variant="danger" onClick={handleClear}>Clear</Button>
                                            <Button className={"col-span-6"}  variant="primary" type="submit">Submit</Button>
                                        </div>
                                    )}
                                </>
                        ) : (
                            <div className="flex col-span-12 justify-end mt-2 gap-2">
                                <Button className={"col-span-6"}  variant="danger" onClick={handleClear}>Clear</Button>
                                <Button className={"col-span-6"}  variant="primary" type="submit">Submit</Button>
                            </div>
                        )
                    }

                </div>

            </form>
            {}
        </div>
    )
}

FormBuilder.propTypes = {
    formFields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            label: PropTypes.string,
            required: PropTypes.bool,
            width: PropTypes.number.isRequired,
            value: PropTypes.string,
        })
    ),
    onSubmit: PropTypes.func,
    formData: PropTypes.object,
    formActionTitle: PropTypes.string,
    formTitle: PropTypes.string,
    wizardMode: PropTypes.bool,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    setFormData: PropTypes.func,

}

export default FormBuilder;