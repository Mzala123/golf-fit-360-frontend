import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getListFittingRequests} from "../../api/endpoints.js";
import InputField from "../../components/form/InputField.jsx";
import {DataType, Table} from "ka-table";
import {Cog} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

function FittingTasks() {

    const [searchText, setSearchText] = useState("");

    const {data} = useQuery({
        queryKey: ["fitting-tasks"],
        queryFn: async () => {
            const response = await getListFittingRequests();
            return response.data;
        }
    })

    const ManageRow = ({rowKeyValue }) => {
        const navigate = useNavigate();

        const handleEdit = () => {
            navigate(`/system/admin/perform_fitting_task/${rowKeyValue}`);
        };

        return (
            <button
                className="text-green-500 hover:text-green-600"
                onClick={handleEdit}
            >
                <Cog className="size-5" />
            </button>
        );
    };

    return (
        <div className="container mx-auto px-4 py-6">

            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="flex  justify-between items-center">
                    <h1 className="text-2xl uppercase font-Poppins_Bold">Fitting Tasks</h1>
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
                            {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.String},
                            {key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String},
                            {key: 'fittingservicecategory', title: 'Fitting Service', dataType: DataType.String},
                            {key: 'firstname', title: 'Firstname', dataType: DataType.String},
                            {key: 'lastname', title: 'Lastname', dataType: DataType.String},
                            {key: 'email', title: 'Email', dataType: DataType.String},
                            { key: 'golfclubsize', title: 'Golf Club Size', dataType: DataType.String },
                            { key: 'address', title: 'Address', dataType: DataType.String },
                            { key: ':manage', title:'Manage Task', width: 70, style: { textAlign: 'center' } },
                        ]}
                        data={data}
                        rowKeyField={'fittingid'}
                        searchText={searchText}
                        noData={{ text: "fitting request details not found!" }}
                        childComponents={{
                            table: {
                                elementAttributes: () => ({
                                    className: 'table-auto w-full border-collapse border border-gray-300 rounded-md',
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
                                        case ':manage':
                                            return <ManageRow {...props} />;
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

export default FittingTasks;