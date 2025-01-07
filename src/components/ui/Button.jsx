import PropTypes from "prop-types";

function Button({children, onClick, variant="primary", isDisabled, isLoading }) {

    const variantClass = {

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