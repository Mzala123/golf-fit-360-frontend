import {LoaderCircle} from "lucide-react";

function PageLoader() {
    return (
        <div className="flex justify-center">
             <LoaderCircle className="h-8 w-8 animate-spin text-gray-600" />
        </div>
    )
}

export default PageLoader;