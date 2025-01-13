import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css"
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getAvailableFittingRequestDateTime} from "../../api/endpoints.js";
import {isBefore, isSameDay, isToday} from "date-fns";

function DatePicker({placeholder, value, onChange, name, onKeyUp, type="date-picker", required=false, label, error}) {

    const dateInfo = value?.split('|')
    const[occupiedDate, setOccupiedDate ] = useState([])
    // const currentDay = new Date()
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDay);

    function handleGetOccupiedDate(){
        getAvailableFittingRequestDateTime().then((response)=>{
            setOccupiedDate(response.data.map((data)=>({...data, date: new Date(data.date).toLocaleDateString('en-CA')})))
        }).catch((error)=>{
            console.log(error);
        })
    }

    console.log(occupiedDate);
    useEffect(()=>{
        handleGetOccupiedDate();
    },[])

    const[dateTime, setDateTime] = useState({
        date:dateInfo[0] || "",
        time:dateInfo[1] || ""
    })

    function handleChange(name, value){
        setDateTime(
            {
                ...dateTime,
                [name]: value
            }
        )
    }

    const timeOptions = [];
    for (let hour = 8; hour <= 16; hour++) {
        const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
        timeOptions.push(time);
    }

    return (
        <div className="grid grid-cols-2 ">
            <div>
                <DayPicker
                    mode="single"
                    selected={ dateTime.date ? new Date(dateTime.date) : new Date() }
                    onSelect={(date)=>{
                        if(date){
                            const formattedDate = date.toLocaleDateString('en-CA');
                            handleChange("date", formattedDate)
                            onChange(`${formattedDate}|${dateTime.time}`);
                        }else{
                            handleChange("date","")
                            onChange("");
                        }
                    }}
                    disabled={(date)=>{
                        const dayOccupiedDate = occupiedDate.filter((data)=>{
                            return isSameDay(data.date, date)
                        })
                        return (isBefore(date, new Date()) && !isToday(date)) ||  (dayOccupiedDate.length >= timeOptions.length)
                    }}

                />
            </div>
            <div className="space-y-2 h-72 py-4 overflow-y-auto">
                {/*<div className="font-Poppins_Bold text-lg">*/}
                {/*    {formattedDate}*/}
                {/*</div>*/}
                {
                    timeOptions.map((time, index)=>{

                        const date = dateTime.date ? new Date(dateTime.date) : new Date()
                        const dayOccupiedDate = occupiedDate.filter((data)=>{
                            return isSameDay(data.date, dateTime.date)
                        }).map((data)=>(data.time))

                        if((!dateTime.date || dayOccupiedDate.includes(`${time}:00`))){
                            return null
                        }
                        return <div key={index} role={"button"} onClick={()=>{
                            if(!dateTime.date || dayOccupiedDate.includes(`${time}:00`) ){
                                return
                            }
                            handleChange("time", time);
                            onChange(`${dateTime.date}|${time}`);
                        }} className={`px-4 py-2 text-center cursor-pointer  transition-all border-2 rounded-md border-black
                            ${dateTime.time === time ? 'bg-green-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}
                        `}>
                            {time}
                        </div>
                    })
                }
            </div>
        </div>

    )
}

DatePicker.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
}

export default DatePicker;