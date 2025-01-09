import {useMemo, useState} from "react";
import FormBuilder from "../../components/form/FormBuilder.jsx";
import useSession from "../../state/useSession.js";
import {scheduleFittingRequest} from "../../api/endpoints.js";
import {toast} from "sonner";

function ScheduleFitting() {

    const {session} = useSession( s=>s);

    const[currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fittingServiceCategory: "",
        fittingScheduleDate: "",
        fittingScheduleTime: "",
        comments: "",
    });

    const totalSteps = 3;
    const steps = [
        { label: "Choose Fitting Service", key: "fittingServiceCategory" },
        { label: "Select Date & Time", key: "dateTime" },
        { label: "Add Comments", key: "comments" },
    ];



    const handleNext = () => {

        if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const fittingServicesOption =  useMemo(()=>(
        [
            {
                value: "Full Bag",
                label: "Full Bag",
                description: "The most comprehensive fitting in the industry, covering all woods, irons, wedges, and your putter.",
                duration:"3.5 HOURS",
                price:"$250",
                discountPrice:"$100"
            },
            {
                value: "Complete Long Game",
                label: "Complete Long Game",
                description: "Combine your driver, fairway woods, and hybrids in this value-based fitting option",
                duration:"2 HOURS",
                price:"$150",
                discountPrice:"$50"
            },
            {
                value: "DRIVER",
                label: "DRIVER",
                description: "Find more power off the tee with this focused fitting.",
                duration:"1.5 HOURS",
                price:"$100",
                discountPrice:"$50"
            },
            {
                value: "Iron + Wedge",
                label: "Iron + Wedge",
                description: "Improve your control with a broad selection of the best clubheads and shafts available",
                duration:"1.5 HOURS",
                price:"$100",
                discountPrice:"$50"
            },

            {
                value: "Fairway Wood + Hybrid",
                label: "Fairway Wood + Hybrid",
                description: "Attack every lie imaginable after dialing in these clubs for optimal launch angle and swing speed.",
                duration:"1 HOUR",
                price:"$75",
                discountPrice:"$50"
            },

            {
                value: "Putter",
                label: "Putter",
                description: "",
                duration:"1 HOUR",
                price:"$75",
                discountPrice:"$50"
            },

        ]
    ),[])



    const fittingScheduleForm = useMemo(()=>{
        switch (currentStep) {
            case 1:
                return [
                    {
                        name: "fittingServiceCategory",
                        value: formData.fittingServiceCategory,
                        placeholder: "Select Fitting Service Category",
                        type: "select",
                        label: "Choose Fitting Service Category",
                        required: true,
                        width: 12,
                        options: fittingServicesOption,
                    },
                ];
            case 2:
                return [
                    {
                        name: "fittingScheduleDate",
                        value: formData.fittingScheduleDate,
                        placeholder: "Fitting Date",
                        type: "date",
                        label: "Fitting Date",
                        required: true,
                        width: 12,
                    },
                    {
                        name: "fittingScheduleTime",
                        value: formData.fittingScheduleTime,
                        placeholder: "Fitting Time",
                        type: "time",
                        label: "Fitting Time",
                        required: true,
                        width: 12,
                    },
                ];
            case 3:
                return [
                    {
                        name: "comments",
                        value: formData.comments,
                        placeholder: "Enter comments",
                        type: "textarea",
                        label: "Comments",
                        required: false,
                        width: 12,
                    },
                ];
            default:
                return [];
        }
    },[currentStep, formData]);

  //  console.log(currentStep)

    function handleSubmit(data) {
        const formDataToSubmit = {
            ...formData,
            userId: session.user.userid
        };

        console.log(formDataToSubmit);
        scheduleFittingRequest(formDataToSubmit).then(response=>{
            toast.success(response.data.message);
        }).catch(error=>{
            toast.error(error.response.data.message)
        })

    }

    return (
        <div className="py-4">

            <FormBuilder
             formFields={fittingScheduleForm}
             formTitle={"Schedule Fitting Request"}
             onSubmit={handleSubmit}
             wizardMode={true}
             currentStep={currentStep}
             totalSteps={totalSteps}
             steps={steps}
             onNext={handleNext}
             onBack={handleBack}
             setFormData={setFormData}
            />


        </div>
    )
}

export default ScheduleFitting;