import React from "react";
import TableContainer from "Common/TableContainer";
import { hubsData } from "Common/data";
import PigBadge from "../Label/PigBadge";
import { Tooltip } from 'react-tooltip'
import { Eye, Search } from "lucide-react";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const HubsTable = () => {

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Nombre',
                accessorKey: 'nombre',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Prioridad',
                accessorKey: 'prioridad',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() === 'Baja' ? 'green' : 'red' } label={props.getValue()} />
                ),
            },
            {
                header: 'Indice',
                accessorKey: 'indice',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge 
                    color={ 
                        (props.getValue() <= 50) 
                            ? 'green' 
                            : ( 50 < props.getValue() && props.getValue() <= 75) 
                                ? 'yellow'
                                : 'red' 
                    } 
                    label={props.getValue() + '%'} 
                    />
                ),
            },
            {
                header: 'Libres',
                accessorKey: 'libres',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Unidades',
                accessorKey: 'unidades',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start gap-2">
                        <button className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Ver">
                            <Tooltip id="default" place="top" content="Ver" />
                            <Eye className="inline-block size-5 text-slate-500 dark:text-zink-200"></Eye>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Hubs</h6>
                        </div>
                        <div className="2xl:col-span-3 2xl:col-start-10">
                            <div className="flex gap-3">
                                <div className="relative grow">
                                    <input 
                                        type="text" 
                                        className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Search for ..."
                                        autoComplete="off" 
                                        onChange={(e) => console.log(e)} />
                                    <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600"></Search>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableContainer
                        isPagination={true}
                        columns={(columns || [])}
                        data={(hubsData || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default HubsTable;