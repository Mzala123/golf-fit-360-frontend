import PropTypes from "prop-types";

function Button({children, onClick, variant="primary", isDisabled, isLoading }) {

    const variantClass = {
        primary:"bg-green-600 hover:bg-green-700 text-white",
        secondary:"bg-gray-300 hover:bg-gray-400 text-white",
        danger:"bg-red-600 hover:bg-red-700 text-white",
    }
    return (
        <button className={`border-none rounded-md px-3 py-2 flex justify-center items-center gap-2 text-sm text-white ${variantClass[variant]}`}
                onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["primary", "danger", "secondary"]),
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
}

export default Button;