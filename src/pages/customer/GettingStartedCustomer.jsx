import {getStartedMessage} from "../../api/endpoints.js";
import {useEffect, useState} from "react";

function GettingStartedCustomer() {

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

    return(
        <div className="flex flex-1 justify-center items-center px-4">
          <p className="font-Martian text-2xl leading-loose text-center">
              {gettingStarted.message}
          </p>
        </div>
    )
}

export default GettingStartedCustomer