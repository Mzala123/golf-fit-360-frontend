import PropTypes from "prop-types";

function RadioButton({value, onChange, name, required=false, type="radio", label, error, options =[]}) {
    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2">
                {
                    options.map((option, index) => (
                            <label htmlFor={name + index} key={option.value}
                                   className={`font-Poppins_Bold flex flex-col justify-between gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer`}>
                                <div className="flex flex-col gap-2 justify-between">
                                    <div className="flex gap-2 justify-between">
                                        <p className={"font-Poppins_Bold"}>{option.label}</p>
                                        <input
                                            className={`px-2 py-2 font-Poppins text-sm border-[1.5px] focus:ring-2 rounded-md ${error ? "border-red-500" : "border-slate-200"} `}
                                            type={type}
                                            value={option.value}
                                            id={name + index}
                                            onChange={onChange}
                                            name={name}
                                            required={required}
                                            defaultChecked={value === option.value}
                                        />
                                    </div>
                                    <p className={"text-sm"}>{option.description}</p>
                                    <div className="flex gap-4 font-Martian">
                                        <span className="font-Poppins_Bold">{option.duration}</span>
                                        <span className="font-Poppins_Bold">{option.discountPrice}</span><span
                                        className={"font-Poppins_Bold line-through"}>{option.price}</span>
                                    </div>
                                </div>
                            </label>
                        )
                    )
                }
                {
                    error && <span className="text-red-500 text-xs"> {error}</span>
                }
            </div>
        </div>

    )
}

RadioButton.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.number,
    isSubmitting: PropTypes.bool,
    type: PropTypes.any,
    options: PropTypes.array,
    error: PropTypes.string,
}


export default RadioButton;