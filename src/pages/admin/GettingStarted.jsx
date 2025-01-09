import {useEffect, useState} from "react";
import {getStartedMessage} from "../../api/endpoints.js";

function GettingStarted() {
    const[gettingStarted, settingStarted] = useState({})

    function handleGettingStarted() {
        getStartedMessage().then((response) => {
            console.log(response.data)
            settingStarted(response.data)
        })
    }

    useEffect(() => {
        handleGettingStarted();
    },[])

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="font-Martian text-2xl leading-loose">
                {gettingStarted.message}
            </div>
        </div>
    )
}

export default GettingStarted;