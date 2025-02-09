import {getStartedMessage} from "../../api/endpoints.js";
import {useQuery} from "@tanstack/react-query";

function GettingStartedCustomer() {


    const {data} = useQuery({
        queryKey: ["getting-started"],
        queryFn: async () => {
            const response = await getStartedMessage();
            return response.data;
        }
    })


    return(
        <div className="flex flex-1 justify-center items-center px-4">
          <p className="font-Martian text-2xl leading-loose text-center">
              {data?.message}
          </p>
        </div>
    )
}

export default GettingStartedCustomer