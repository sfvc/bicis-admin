import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip'
import { Eye } from "lucide-react";
import TableContainer from "Common/TableContainer";
import PigBadge from "Common/Components/Ui/Label/PigBadge";
import NoResults from "Common/NoResults";
import Pagination from "Common/Components/Pagination";
import { startLoadingTickets, startPaginateTickets } from "slices/app/tickets/thunks";

export const tiposBicicleta = ['ELECTRICA', 'ESTANDAR']
export const estadosBicicleta = ['EN_BASE', 'EN_HUB', 'EN_TALLER', 'EN_CALLE', 'BALANCEO_POR_EL_OPERADOR']
export const condicionBicicleta = ['ACTIVA', 'INACTIVA']

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const TicketsTable = () => {
    const dispatch = useDispatch<any>();
    const { tickets, paginate } = useSelector( (state: any) => state.Ticket );

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Usuario',
                accessorKey: 'usuario',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Estado',
                accessorKey: 'estado',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (<PigBadge color="slate" label={props.getValue()} />)
            },
            {
                header: 'Tipo de ticket',
                accessorKey: 'tipo_ticket',
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

    useEffect(() => {
        dispatch( startLoadingTickets() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="flex justify-between items-center gap-3 mb-5">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Tickets</h6>
                        </div>
                    </div>

                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(tickets || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={tickets}/>

                    { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page) => dispatch( startPaginateTickets(page) )}
                        />
                    )}

                </div>
            </div>
        </React.Fragment>
    );
}

export default TicketsTable;