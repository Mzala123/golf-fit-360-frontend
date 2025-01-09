import PropTypes from "prop-types";

function TimeField({placeholder, value, onChange, name, onKeyUp, type="time", required=false, label, error}) {
    // return(
    //     <div className={`flex flex-col gap-[6px]`}>
    //         <div className={"flex gap-1"}>
    //             <label htmlFor={name}>{label}</label> {required && <span className="text-red-500">*</span>}
    //         </div>
    //         <input className={`px-2 py-2 text-sm border-[1.5px] focus:ring-2 rounded-md ${error ? "border-red-500" : "border-slate-200"} `}
    //                type={type}
    //                placeholder={placeholder}
    //                value={value}
    //                onChange={onChange}
    //                name={name}
    //                onKeyUp={onKeyUp}
    //                min="08:00"
    //                max="16:00"
    //                step="3600"
    //         />
    //         {error && <span className="text-red-500 text-xs"> {error}</span> }
    //     </div>
    // )

    // Generate valid time options from 8:00 AM to 4:00 PM
    const timeOptions = [];
    for (let hour = 8; hour <= 16; hour++) {
        const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
        timeOptions.push(time);
    }

    return (
        <div className={`flex flex-col gap-[6px]`}>
            <div className={"flex gap-1"}>
                <label htmlFor={name}>{label}</label> {required && <span className="text-red-500">*</span>}
            </div>
            <select
                className={`px-2 py-2 text-sm border-[1.5px] focus:ring-2 rounded-md ${
                    error ? "border-red-500" : "border-slate-200"
                }`}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                required={required}
            >
                <option value="" disabled>
                    {placeholder || "Select a time"}
                </option>
                {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}

TimeField.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string,
    onKeyUp: PropTypes.func,
    type: PropTypes.any,
    required: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.number,
    error: PropTypes.string
}

export default TimeField;