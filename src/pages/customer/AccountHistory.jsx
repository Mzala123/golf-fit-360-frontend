import {useState} from "react";
import {readCustomerFittings} from "../../api/endpoints.js";
import InputField from "../../components/form/InputField.jsx";
import {DataType, Table} from "ka-table";
import useSession from "../../state/useSession.js";
import {useQuery} from "@tanstack/react-query";

function AccountHistory() {
    const{session} = useSession(s=>s)
    const userId = session.user.userid

    const [searchText, setSearchText] = useState("");

    const {data} = useQuery({
        queryKey: ["customer-history-progress", userId],
        queryFn: async () => {
            const response = await readCustomerFittings();
            return response.data;
        }
    })

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="flex  justify-between items-center">
                    <h1 className="text-2xl uppercase font-Poppins_Bold">My Fitting History</h1>
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
                            { key: 'status', title: 'Status', dataType: DataType.String },
                            { key: 'address', title: 'Address', dataType: DataType.String },
                            {key: 'formatted_fittingscheduledate', title: 'Fitting Date', dataType: DataType.String},
                            {key: 'fittingscheduletime', title: 'Fitting Time', dataType: DataType.String}
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
                        }}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistory;