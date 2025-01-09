import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    viewFittingTaskProgressList
} from "../../api/endpoints.js";

import {ChevronLeft} from "lucide-react";

function ViewFittingProgress() {
    const navigate = useNavigate();
    const params = useParams();
    const fittingId = params.id


    const[fittingProgress, setFittingProgress] = useState([]);

    function handleViewFittingTaskProgressList(){
        viewFittingTaskProgressList(fittingId).then((response) => {
            setFittingProgress(response.data)
        })
    }


    useEffect(()=>{
       // getFittingRequestTasks()
        handleViewFittingTaskProgressList()
    },[fittingId])

    return (
        <div className="mt-4 container mx-auto w-auto lg:w-[700px]">
            <div className="flex flex-col gap-6">
                <div className="flex gap-2 mb-6">
                    <ChevronLeft className={"size-8 hover:rounded-full hover:cursor-pointer hover:bg-slate-200"}
                                 onClick={() => navigate(-1)}/>
                    <h1 className="text-2xl uppercase font-Poppins_Bold"> Fitting Progress</h1>
                </div>

                <div className="flex flex-col gap-2">
                    {
                        fittingProgress.map((task) => {
                            return <div key={task.fittingtaskid}
                                        className="bg-slate-100 border-l-4 border-green-600 rounded-sm p-2 flex gap-2">
                                <div className="flex flex-col gap-1 flex-1">
                                    <h3 className="text-[16px] font-Poppins_Bold">{task.taskname} - {task.fittingtaskstatus}</h3>
                                    <p className="text-xs font-Poppins">Fitting service
                                        category: {task.fittingservicecategory}</p>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default ViewFittingProgress;