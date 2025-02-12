import {useState} from "react";
import {getfittingRequestSchedules} from "../../api/endpoints.js";
import {DataType} from "ka-table";
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/ui/DataTable.jsx";


const columns=[
        {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
        {key: 'firstname', title: 'Firstname', dataType: DataType.String},
        {key: 'lastname', title: 'Lastname', dataType: DataType.String},
        {key: 'status', title: 'Status', dataType: DataType.String},
]



function FittingSchedule() {

    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })


    const {data, isLoading, error} = useQuery({
        queryKey: ["fitting-schedules", paginate.limit, paginate.page, paginate.searchQuery,paginate.sort],
        queryFn: async () => {
            const response = await getfittingRequestSchedules(paginate.page, paginate.limit, paginate.searchQuery, paginate.sort);
            return response.data.data;
        }
    })

    if(error){
        return <div className="flex w-full bg-red-300 h-8 text-center text-stone-50 justify-center items-center"> A {error.message} error occured </div>
    }

    return (
        <div className="w-full flex mx-auto px-4 py-6">
            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="flex flex-1 overflow-x-auto">
                    <div className="flex flex-1 w-full overflow-y-auto">
                    <DataTable
                        title="Fitting Schedules"
                        description="Fitting schedules report listing all completed services."
                        data={data}
                        columnHeaders={columns}
                        rowPrimaryKey={"fittingid"}
                        isLoading={isLoading}
                        paginate={paginate}
                        onPageChange={(page) => {
                            setPaginate((paginate) => {
                                return {
                                    ...paginate,
                                    page: page
                                }
                            });
                        }}
                        onLimitChange={(limit) => {
                            setPaginate((paginate) => {
                                return {
                                    ...paginate,
                                    limit: limit
                                }
                            })
                        }}

                        onSearch={(searchQuery) => {
                            setPaginate((paginate) => {
                                return {
                                    ...paginate,
                                    searchQuery: searchQuery
                                }
                            })
                        }}
                        onSort={(col) => {
                            setPaginate((paginate) => {
                                return {
                                    ...paginate,
                                    sort: paginate.sort.includes(col) ? paginate.sort.includes("-") ? col : `-${col}` : col
                                }
                            })
                        }}

                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FittingSchedule;