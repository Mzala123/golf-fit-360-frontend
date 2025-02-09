import {LoaderCircle} from 'lucide-react'
import PropTypes from "prop-types";

function PageLoader({children}) {

    return (
        <div className="flex gap-2 justify-center items-center">
            <LoaderCircle className="animate-spin " size={20}/> <span className="font-Poppins_Bold">{children}</span>
        </div>
    )
}

PageLoader.propTypes = {
    children: PropTypes.node,
}

export default PageLoader;