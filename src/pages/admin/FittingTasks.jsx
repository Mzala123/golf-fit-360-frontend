import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getListFittingRequests} from "../../api/endpoints.js";
import {DataType} from "ka-table";
import {Cog, Pencil} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/ui/DataTable.jsx";

const columnHeaders = [
    {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.String},
    {key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String},
    {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
    {key: 'firstname', title: 'Firstname', dataType: DataType.String},
    {key: 'lastname', title: 'Lastname', dataType: DataType.String},
    {key: 'email', title: 'Email', dataType: DataType.String},
    { key: 'golfclubsize', title: 'Golf Club Size', dataType: DataType.String },
    { key: 'address', title: 'Address', dataType: DataType.String },
    // { key: ':manage', title:'Manage Task', width: 70, style: { textAlign: 'center' } },
]

function FittingTasks() {

    const navigate = useNavigate();
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })

    const {data, isLoading, error} = useQuery({
        queryKey: ["fitting-request", paginate.limit, paginate.page, paginate.searchQuery,paginate.sort],
        queryFn: async () => {
            const response = await getListFittingRequests(paginate.page, paginate.limit, paginate.searchQuery, paginate.sort);
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

    return (
        <div className="w-full flex mx-auto px-4 py-6">

            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="overflow-x-auto flex flex-1">
                    <div className="flex flex-1 overflow-y-auto">
                        <DataTable
                            title="Fitting Tasks"
                            description="Fitting requests report listing all fittings."
                            data={data}
                            columnHeaders={columnHeaders}
                            rowPrimaryKey={"fittingid"}
                            isLoading={isLoading}
                            paginate={paginate}
                            actions={
                                [
                                    {
                                        icon: <Cog/>,
                                        onClick: (rowData)=>{
                                            navigate(`/system/admin/perform_fitting_task/${rowData.fittingid}`)
                                        },
                                        className:"flex gap-2 text-green-500 size-4 justify-center items-center",
                                    }
                                ]
                            }
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

export default FittingTasks;