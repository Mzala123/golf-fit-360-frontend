import PropTypes from "prop-types";

function InputField({name, value, onChange, placeholder, onKeyUp, type="text", required=false, label, isSubmitting}) {
    return(
        <div className={`flex flex-col gap-[6px]`}>
            <div>
                <label htmlFor={name}>{label}</label>
            </div>
            <input className={`px-2 py-2 text-sm border-[1.5px] focus:ring-2 rounded-md border-slate-200`}
                   name={name}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
                   onKeyUp={onKeyUp}
                   type={type}
                   required={required}
            />
        </div>
    )
}

InputField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.any,
    required: PropTypes.bool,
    label: PropTypes.string,
    isSubmitting: PropTypes.bool,
}
export default InputField;