import {useNavigate} from "react-router-dom";
import useSession from "../../state/useSession.js";
import {useState} from "react";
import { viewFittingProgressList} from "../../api/endpoints.js";
import {DataType} from "ka-table";
import {Eye} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/ui/DataTable.jsx";


const columns=[
        {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
{ key: 'status', title: 'Fitting Request Status', dataType: DataType.String },
{ key: 'comments', title: 'Comments', dataType: DataType.String },
{key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.Date},
{key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String},
]

function FittingProgress() {


    const navigate = useNavigate();
    const{session} = useSession(s=>s)
    const userId = session.user.userid

    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: "",
        sort: ""
    })

    const {data} = useQuery({
        queryKey: ["customer-fitting-progress", paginate.limit, paginate.page, paginate.searchQuery, paginate.sort, userId],
        queryFn: async () => {
            const response = await viewFittingProgressList(paginate.page, paginate.limit, paginate.searchQuery, paginate.sort);
            return response.data.data;
        }
    })

    return (
        <div className="w-full flex mx-auto px-4 py-6">
            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="overflow-x-auto flex flex-1">
                    <div className="flex flex-1 w-full overflow-y-auto">
                    <DataTable
                        data={data}
                        title={"Customer Fitting Progress"}
                        description="Report showing customer fitting service progress"
                        columnHeaders={columns}
                        rowPrimaryKey={'fittingid'}
                        paginate={paginate}
                        actions={
                            [
                                {
                                    icon: <Eye/>,
                                    onClick: (rowData)=>{
                                        navigate(`/system/customer/view_fitting_progress/${rowData.fittingid}`)
                                    },
                                    className:"flex gap-2 text-blue-500 size-4 justify-center items-center",
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
export default FittingProgress;