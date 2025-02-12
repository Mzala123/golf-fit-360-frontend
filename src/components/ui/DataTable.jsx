import PropTypes from "prop-types";
import InputField from "../form/InputField.jsx";
// import {faker} from "@faker-js/faker"
import {useMemo} from "react";
import {flattenArray, paginationHandler} from "../../lib/utils.js";
import PageLoader from "./PageLoader.jsx";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";


const limits = [10, 20, 50]

function DataTable({
                       title = "", description = "", data = [], columnHeaders = [], rowPrimaryKey, actions = [],
                       isLoading = false, paginate, onPageChange, onLimitChange, onSearch, onSort
                   }) {

    const rows = useMemo(() => flattenArray(columnHeaders, data), [columnHeaders, data]);
    const paginationPages = useMemo(() => {
        return paginationHandler(paginate.page, paginate.totalPages)
    }, [paginate.page, paginate.totalPages])


    const hasActions = actions.length > 0;
    const updatedColumnHeaders = hasActions ?
        [...columnHeaders,
            {
                key: "manage",
                title: "Manage",
                width: "150",
                render: (rowData) => <ButtonActions rowData={rowData} actions={actions}/>
            }] : columnHeaders;

    return (
        <div className="flex flex-1 flex-col gap-2 rounded-md w-full bg-white">
            <div className="w-full flex flex-col gap-2 items-center justify-between py-2 lg:flex-row">
                <div className="flex flex-col justify-center">
                    <p className="text-xl font-Poppins_Bold text-center lg:text-left">{title}</p>
                    <span className="text-xs text-gray-700 text-center font-Martian lg:text-left">{description}</span>
                </div>
                <div className="flex w-full gap-4 justify-center items-center lg:w-auto">
                    <InputField name="searchItem" value={paginate.searchQuery} placeholder={"Search..."} type="search"
                                onChange={(e) => onSearch(e.target.value)}/>
                </div>
            </div>

            <div
                className="relative flex flex-1 justify-center items-center border rounded border-stone-200 overflow-y-auto w-full">
                {
                    isLoading ? <PageLoader/> : (
                        <table className="absolute  top-0 left-0 bottom-0 w-full flex-1">
                            <thead className="w-full">
                            <tr className="space-y-2 sticky top-0">
                                {
                                    updatedColumnHeaders.map((colHeader) => {
                                        return <th style={{width: colHeader.width + 'px'}}
                                                   onClick={() => onSort(colHeader.key)}
                                                   className=" bg-stone-100 cursor-pointer whitespace-nowrap capitalize text-sm font-Martian text-left border-r border-b border-stone-200 px-2 py-2"
                                                   key={colHeader.key}>
                                           <span className="flex items-center gap-1">
                                               {colHeader.title}
                                               {paginate.sort.includes(colHeader.key) &&
                                                   (<ChevronDownIcon size={18}
                                                                     className={`w-5 h-5 text-gray-400 transition-all ${paginate.sort.includes("-") && "rotate-180"} `}/>)}
                                           </span>
                                        </th>
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody className="">
                            {
                                rows.length > 0 ?
                                    (rows.map(rowData => {
                                        return <tr key={rowData[rowPrimaryKey]} className="border-b border-stone-200">
                                            {
                                                updatedColumnHeaders.map((colHeader) => {
                                                    return <td key={colHeader.key}
                                                               className="py-3 border-r border-stone-200 px-2 text-sm">
                                                        {colHeader.render ? colHeader.render(rowData) : rowData[colHeader.key]}
                                                    </td>
                                                })
                                            }
                                        </tr>
                                    })) : <tr className="">
                                        <td colSpan={updatedColumnHeaders.length} className="text-center pt-4">
                                            No records found...
                                        </td>
                                    </tr>
                            }
                            </tbody>
                        </table>
                    )
                }
            </div>
            <div
                className="flex justify-between border-b border-r border-l border-stone-200 rounded-b-md relative -top-2.5 p-2">
                <div>
                    {
                        limits.map((limit, index) => {
                            return <button onClick={() => onLimitChange(limit)}
                                           className={`px-3 py-1 text-sm rounded-md hover:bg-stone-200 ${limit == paginate.limit ? "border border-stone-300 bg-white" : ""}`} key={index}>
                                {limit}
                            </button>
                        })
                    }
                </div>
                <div className="flex gap-1 items-center">
                    {
                        paginationPages.map((page) => {
                            return <button onClick={() => onPageChange(page.value)}
                                           className={`hover:bg-stone-200 px-3 py-1 text-sm rounded ${page.isActive ? "border border-stone-300 bg-white" : ""}`}
                                           key={page.value}>
                                {page.label}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

DataTable.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    columnHeaders: PropTypes.array,
    data: PropTypes.array,
    rowPrimaryKey: PropTypes.string,
    actions: PropTypes.array,
    isLoading: PropTypes.bool,
    onSearch: PropTypes.func,
}

export default DataTable;

DataTable.propTypes = {
    paginate: PropTypes.object,
    onPageChange: PropTypes.func,
    onLimitChange: PropTypes.func,
}


function ButtonActions({actions, rowData}) {

    return <div className="flex justify-center items-center gap-2">
        {
            actions.map((action, index) => {
                return <button key={index} className={action.className} onClick={() => action.onClick(rowData)}>
                    {action.label} {action.icon}
                </button>
            })
        }
    </div>
}

ButtonActions.propTypes = {
    actions: PropTypes.array,
    rowData: PropTypes.object,
}