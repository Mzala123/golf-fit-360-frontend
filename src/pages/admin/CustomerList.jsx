import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getAllCustomers} from "../../api/endpoints.js";
import {DataType, Table} from "ka-table";
import InputField from "../../components/form/InputField.jsx";
import {Pencil} from "lucide-react";

function CustomerList() {

    const params = useParams();
    const navigate = useNavigate();

    const isId = useMemo(()=>params.id !== '+', [params])

    const[customers, setCustomers]= useState([]);
    const[searchText, setSearchText] = useState("");

    function handleGetCustomers() {
        getAllCustomers().then((response) => {
            console.log(response.data);
            setCustomers(response.data)
        })
    }

    const handleEdit = (id) => {
        navigate(`/edit-customer/${id}`);
    };

    useEffect(()=>{
        handleGetCustomers()
    },[])


    return (
        <div className="container mx-auto px-4 py-6">

            <div className="bg-white rounded-md w-full flex flex-col gap-6">
                <div className="flex  justify-between items-center">
                    <h1 className="text-2xl uppercase font-Poppins_Bold">Customer List</h1>
                    <div className="flex justify-end ">
                        <InputField onChange={(e) => {
                            setSearchText(e.currentTarget.value)
                        }}
                                    value={searchText}
                                    name={'searchText'}
                                    label={''} type={'search'}
                                    className={'search_field'}
                                    placeholder="Find"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                <Table
                        columns={[
                            {key: 'firstname', title: 'Firstname', dataType: DataType.String},
                            {key: 'lastname', title: 'Lastname', dataType: DataType.String},
                            {key: 'email', title: 'Email', dataType: DataType.String},
                            {key: 'phonenumber', title: 'Phonenumber', dataType: DataType.String },
                            { key: 'golfclubsize', title: 'Golf Club Size', dataType: DataType.String },
                            { key: 'address', title: 'Address', dataType: DataType.String },
                            { key: 'manage', title: 'Manage', dataType: DataType.String,
                                render: ({ rowData }) => (
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => {handleEdit(rowData.customerid)}}
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                ),
                            }
                        ]}
                        data={customers}
                        rowKeyField={'customerid'}
                        searchText={searchText}
                        noData={{ text: "Customer details not found!" }}
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
    )
}
export default CustomerList;