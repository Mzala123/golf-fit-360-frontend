import PropTypes from "prop-types";

function TextArea({placeholder, value, onChange, name, onKeyUp, type="text", required=false, label, error, cols=6, rows=6}) {
    return(
        <div className={`flex flex-col gap-[6px]`}>
            <div className={"flex gap-1"}>
                <label htmlFor={name}>{label}</label> {required && <span className="text-red-500">*</span>}
            </div>
            <textarea className={`px-2 py-2 text-sm border-[1.5px] focus:ring-2 rounded-md ${error ? "border-red-500" : "border-slate-200"} `}
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
            {error && <span className="text-red-500 text-xs"> {error}</span> }
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
    cols: PropTypes.number,
    rows: PropTypes.number,
    error: PropTypes.string,
}

export default TextArea