import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    cancelFittingRequestsTasks,
    getFittingRequestTasksList,
    getOneFittingRequests,
    performFittingTask
} from "../../api/endpoints.js";
import {toast} from "sonner";
import {ChevronLeft} from "lucide-react";
import Button from "../../components/ui/Button.jsx";


function PerformFittingTasks() {

    const navigate = useNavigate();
    const params = useParams();
    const fittingId = params.id
    const[fittingRequests, setFittingRequests] = useState([]);
    const[fittingDetail,setFittingDetail ] = useState({});
    //const[isLoading, setIsLoading] = useState(true)


    function getFittingRequestTasks() {
        getFittingRequestTasksList(fittingId).then(response => {
            setFittingRequests(response.data)
        }).catch(error =>
            toast(error.response.data.message)
        )
    }

    function handleGetFittingTaskDetails(){
        getOneFittingRequests(fittingId).then((response) => {
            setFittingDetail(response.data)
        })
    }

    function handleTaskCompletion(taskId, taskname) {
        const formData ={
            "fittingId": fittingId,
            "taskname": taskname,
        }

        performFittingTask(taskId, formData).then((response) => {
            toast.success(response.data.message);
            getFittingRequestTasks();
        }).catch(error => {
            toast.error(error.response.data.message || "Failed to complete task");
        });
    }

    console.log(fittingRequests);

    function handleCancelFittingRequest(fittingId){
        console.log(fittingId);
        cancelFittingRequestsTasks(fittingId).then((response) => {
            toast.success(response.data.message);
            navigate(-1);
        }).catch(error => {
            toast.error(error.response.data.message || "Failed to cancel fitting request complete");
        })

    }

    useEffect(()=>{
        getFittingRequestTasks()
        handleGetFittingTaskDetails()
    },[fittingId])

    return (
        <div className="mt-4 container mx-auto px-4">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 mb-2">
                    <ChevronLeft className={"size-8 hover:rounded-full hover:cursor-pointer hover:bg-slate-200"}
                                 onClick={() => navigate(-1)}/>
                    <h1 className="text-2xl uppercase font-Poppins_Bold">Perform fitting tasks for {fittingDetail.firstname} {fittingDetail.lastname}</h1>
                </div>

                <div className="flex flex-col gap-2">
                    {
                        fittingRequests.map((task) => {
                            return <div key={task.fittingtaskid}
                                        className="bg-slate-100 border-l-2 border-green-600 rounded-sm p-2 flex gap-1">
                                <div className="flex flex-col gap-1 flex-1">
                                    <h3 className="text-[16px] font-Poppins_Bold">{task.taskname} - {task.fittingtaskstatus}</h3>
                                    <p className="text-xs font-Poppins">Fitting service
                                        category: {task.fittingservicecategory}</p>
                                </div>
                                <div className="text-white flex gap-2 items-end p-1">
                                    <input
                                        type="checkbox"
                                        disabled={task.isdone}
                                        checked={task.isdone}
                                        onChange={() => handleTaskCompletion(task.fittingtaskid, task.taskname)}
                                        className="text-green-600 border-2 border-green-600 ring-green-600 size-6 hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="flex justify-end">
                    <Button variant={"danger"} onClick={()=>{
                        handleCancelFittingRequest(fittingRequests[0].fittingid)
                    }}>Cancel</Button>
                </div>

            </div>

        </div>
    )
}

export default PerformFittingTasks;