
import {useState} from "react";
import {getfittingRequestHistory} from "../../api/endpoints.js";
import {DataType} from "ka-table";
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/ui/DataTable.jsx";

const  columns=[
    {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.Date},
    {key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String},
    {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
    {key: 'firstname', title: 'Firstname', dataType: DataType.String},
    {key: 'lastname', title: 'Lastname', dataType: DataType.String},
    {key: 'email', title: 'Email', dataType: DataType.String},
    { key: 'status', title: 'Status', dataType: DataType.String },
]

function FittingHistory() {


    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 20,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })

    const {data: fittingHistory, error, isLoading} = useQuery({
        queryKey: ["fitting-history", paginate.limit, paginate.page, paginate.searchQuery,paginate.sort],
        queryFn: async () => {
            const response = await getfittingRequestHistory(paginate.page, paginate.limit, paginate.searchQuery, paginate.sort);
            setPaginate({
                page: response.data.currentPage,
                limit: response.data.perPage,
                totalPages: response.data.totalPages,
                searchQuery: paginate.searchQuery,
                sort: paginate.sort
            })
            return response.data.data;
        }
    })

    if(error){
        return <div className="flex w-full bg-red-300 h-8 text-center text-stone-50 justify-center items-center"> A {error.message} error occured </div>
    }

    return (
        <div className="w-full flex mx-auto px-4 py-6">

            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="overflow-x-auto flex flex-1">
                    <div className="flex flex-1 w-full overflow-y-auto">
                    <DataTable
                        data={fittingHistory}
                        rowPrimaryKey={"fittingid"}
                        title="Fitting History"
                        description="Fitting History report listing all services."
                        columnHeaders={columns}
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

export default FittingHistory;