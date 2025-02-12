import PropTypes from "prop-types";
import {Suspense} from "react";
import PageLoader from "./ui/PageLoader.jsx";

export default function SuspendedPage({ page }) {
    return (
        <Suspense fallback={<PageLoader/>}>
            {page}
        </Suspense>
    );
}

SuspendedPage.propTypes = {
    page: PropTypes.node.isRequired,
};