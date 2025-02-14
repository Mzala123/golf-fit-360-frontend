import {useState} from "react";
import {readCustomerFittings} from "../../api/endpoints.js";
import {DataType} from "ka-table";
import useSession from "../../state/useSession.js";
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/ui/DataTable.jsx";

const columns=[
    {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
    {key: 'status', title: 'Status', dataType: DataType.String },
    {key: 'address', title: 'Address', dataType: DataType.String },
    {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.Date},
]

function AccountHistory() {
    const{session} = useSession(s=>s)
    const userId = session.user.userid
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 20,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })

    const {data, isLoading, error} = useQuery({
        // queryKey: ["customer-history-progress", paginate.limit, paginate.page, paginate.searchQuery,paginate.sort, userId],
        queryKey: ["customer-history-progress", userId, paginate.limit, paginate.page, paginate.searchQuery,paginate.sort],
        queryFn: async () => {
            const response = await readCustomerFittings(paginate.page, paginate.limit, paginate.searchQuery,paginate.sort);
            return response.data.data;
        }
    })

    if(error){
        return <div className="flex w-full bg-red-300 h-8 text-center text-stone-50 justify-center items-center"> A {error.message} error occured </div>
    }


    return (
        <div className="flex w-full mx-auto px-4 py-6">
            <div className="bg-white rounded-md w-full flex flex-1 flex-col gap-6">
                <div className="overflow-x-auto flex flex-1">
                    <div className="flex flex-1 w-full overflow-y-auto">
                    <DataTable
                        title="Customer Fitting History"
                        description="A customer report listing all his or her services."
                        data={data}
                        rowPrimaryKey={'fittingid'}
                        columnHeaders={columns}
                        paginate={paginate}
                        isLoading={isLoading}
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

export default AccountHistory;