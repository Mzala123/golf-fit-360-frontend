import PropTypes from "prop-types";

function TextArea({placeholder, value, onChange, name, onKeyUp, type="text", required=false, label, isSubmitting, cols=5, rows=5}) {
    // const showError = isSubmitting && required && !value;
    return(
        <div className={`flex flex-col gap-[6px]`}>
            <div className={"flex gap-1"}>
                <label htmlFor={name}>{label}</label>
                {/*{required && <p className="text-red-500">*</p>}*/}
            </div>
            <textarea className={`px-2 py-2 text-sm border-[1.5px] focus:ring-2 rounded-md border-slate-200 `}
                      type={type}
                      value={value}
                      onChange={onChange}
                      name={name}
                      onKeyUp={onKeyUp}
                      cols={cols}
                      rows={rows}
            >
                placeholder={placeholder}
            </textarea>
            {/*{showError && <span className="text-red-500 text-xs"> {label} is required</span> }*/}
        </div>
    )
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string,
    onKeyUp: PropTypes.func,
    type: PropTypes.any,
    required: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.number,
    isSubmitting: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
}

export default TextArea