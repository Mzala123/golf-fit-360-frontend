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
        <div className="flex justify-center items-center bg-pink-300">
          <div className="font-Martian text-2xl leading-loose">
              {gettingStarted.message}
          </div>
        </div>
    )
}

export default GettingStartedCustomer