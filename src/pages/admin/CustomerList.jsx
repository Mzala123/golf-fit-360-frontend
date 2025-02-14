import {useNavigate} from "react-router-dom";
import {Pencil} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import DataTable from "../../components/ui/DataTable.jsx";
import {getAllCustomers} from "../../api/endpoints.js";

const columnHeaders = [
    {key: "firstname", title: "Full name", width: 300, DataType: "string", filterable: true},
    {key: "lastname", title: "Username", width: 300, DataType: "string", filterable: true},
    {key: "email", title: "Email", width: 300, DataType: "string", filterable: true},
    {key: "address", title: "Address", width: 300, DataType: "string", filterable: true},
    {key: "phonenumber", title: "Phone number", width: 300, DataType: "string", filterable: true},
    {key: "golfclubsize", title: "Golf Club Size", width: 300, DataType: "string", filterable: true},
    {key: "gender", title: "Gender", width: 300, DataType: "string", filterable: true},
]

function CustomerList() {

    const navigate = useNavigate();
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 20,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })

    const {data, isLoading, error} = useQuery({
        queryKey: ["customers", paginate.limit, paginate.page, paginate.searchQuery,paginate.sort],
        queryFn: async () => {
            const response = await getAllCustomers(paginate.page, paginate.limit, paginate.searchQuery,paginate.sort)
            setPaginate({
                page: response.data.currentPage,
                limit: response.data.perPage,
                totalPages: response.data.totalPages,
                searchQuery: paginate.searchQuery,
                sort: paginate.sort
            })
            return response.data.data
        }
    })

    if(error){
        return <div className="flex w-full bg-red-300 h-8 text-center text-stone-50 justify-center items-center"> A {error.message} error occured </div>
    }

    return (
        <div className="w-full flex mx-auto px-4 py-6">

            <div className="bg-white rounded-md w-full flex flex-1 flex-col gap-6">
                <div className="overflow-x-auto flex flex-1">
                    <div className="flex flex-1 w-full overflow-y-auto ">
                        <DataTable
                            title="Customer Profile List"
                            description="A customer report listing all registered customers."
                            data={data}
                            columnHeaders={columnHeaders}
                            rowPrimaryKey={"customerid"}
                            isLoading={isLoading}
                                actions={
                                [
                                    {
                                        icon: <Pencil/>,
                                        onClick: (rowData)=>{
                                            navigate(`/system/admin/edit_customer/${rowData.customerid}`)
                                        },
                                        className:"flex gap-2 text-blue-500 size-4 justify-center items-center",
                                    }
                                ]
                            }
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

export default CustomerList;