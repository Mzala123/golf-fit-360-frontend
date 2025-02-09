import {useNavigate} from "react-router-dom";
import useSession from "../../state/useSession.js";
import {useState} from "react";
import { viewFittingProgressList} from "../../api/endpoints.js";
import InputField from "../../components/form/InputField.jsx";
import {DataType, Table} from "ka-table";
import {Eye} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

function FittingProgress() {

    const{session} = useSession(s=>s)
    const userId = session.user.userid

    const [searchText, setSearchText] = useState("");
    const {data} = useQuery({
        queryKey: ["customer-fitting-progress", userId],
        queryFn: async () => {
            const response = await viewFittingProgressList(userId);
            return response.data;
        }
    })

    const ViewRow = ({rowKeyValue }) => {
        const navigate = useNavigate();

        const handleEdit = () => {
            navigate(`/system/customer/view_fitting_progress/${rowKeyValue}`);
        };

        return (
            <button
                className="text-green-600 hover:text-green-700"
                onClick={handleEdit}
            >
                <Eye className="size-5" />
            </button>
        );
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="flex  justify-between items-center">
                    <h1 className="text-2xl uppercase font-Poppins_Bold">My Fitting Progress</h1>
                    <div className="flex justify-end ">
                        <InputField onChange={(e) => {
                            setSearchText(e.currentTarget.value)
                        }}
                                    value={searchText}
                                    name={'searchText'}
                                    label={''} type={'search'}
                                    className={'search_field'}
                                    placeholder="search"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="max-h-[800px] overflow-y-auto">
                    <Table
                        columns={[
                            {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
                            { key: 'status', title: 'Fitting Request Status', dataType: DataType.String },
                            { key: 'comments', title: 'Comments', dataType: DataType.String },
                            {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.Date},
                            {key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String},
                            { key: ':view', title:'Progress', width: 70, style: { textAlign: 'center' } },
                        ]}
                        data={data}
                        rowKeyField={'fittingid'}
                        searchText={searchText}
                        noData={{ text: "fitting request details not found!" }}
                        childComponents={{
                            table: {
                                elementAttributes: () => ({
                                    className: 'table-auto w-full border-collapse border border-gray-300',
                                }),
                            },
                            headCell: {
                                elementAttributes: () => ({
                                    className: 'bg-gray-200 text-left px-4 py-2 text-black font-Poppins_Bold border-b border-gray-300',
                                }),
                            },
                            cell: {
                                elementAttributes: () => ({
                                    className: 'px-4 py-2 text-gray-600 border-b border-gray-300',
                                }),
                            },
                            cellText: {
                                content: (props) => {
                                    switch (props.column.key) {
                                        case ':view':
                                            return <ViewRow {...props} />;
                                    }
                                },
                            }
                        }}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FittingProgress;