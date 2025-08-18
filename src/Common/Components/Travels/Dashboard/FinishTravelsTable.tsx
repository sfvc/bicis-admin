import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip'
import { Eye } from "lucide-react";
import TableContainer from "Common/TableContainer";
import PigBadge from "../../Ui/Label/PigBadge";
import NoResults from "Common/NoResults";
import { useNavigate } from "react-router-dom";
import Cronometro from "Common/Components/Cronometro";
import Pagination from "Common/Components/Pagination";
import useLoading from "Hooks/useLoading";
import { Skeleton } from "Common/Components/Ui/Loading/Skeleton";
import { setActiveTravel } from "slices/app/travel/reducer";
import { startLoadingTravels, startPaginateTravels } from "slices/app/travel/thunks";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const FinishTravelsTable = () => {
    const { travels, paginate } = useSelector( (state: any) => state.Travel );
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    /* const loading = useLoading(async () => {
        await initLoading();
    }); */

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
                cell: (props: any) => (
                    <span>{props.getValue().nombre} {props.getValue().apellido}</span>
                ),
            },
            {
                header: 'Tipo de unidad',
                accessorKey: 'bicicleta.tipo_de_unidad',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() === 'ELECTRICA' ? 'yellow' : 'purple' } label={props.getValue() || 'FALTA_TIPO'} />
                ),
            },
            {
                header: 'Unidad',
                accessorKey: 'bicicleta.patente',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Origen',
                accessorKey: 'estacion_inicio.nombre',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Fecha Inicio',
                accessorKey: 'fecha_inicio',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span>
                        {
                            props.getValue() 
                                ? new Date(props.getValue()).toLocaleString()
                                : '-'
                        }
                    </span>
                ),
            },
            {
                header: 'Destino',
                accessorKey: 'estacion_final.nombre',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span>{props.getValue() || '-'}</span>
                ),
            },
            {
                header: 'Fecha de Fin',
                accessorKey: 'fecha_finalizacion',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span>
                        {
                            props.getValue() 
                                ? new Date(props.getValue()).toLocaleString()
                                : '-'
                        }
                    </span>
                ),
            },
            {
                header: 'Duracion',
                accessorKey: 'duracion',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <>
                        {
                            props.row.original.estado === 'EN_VIAJE'
                                ? <Cronometro fechaInicio={props.row.original.fecha_inicio} />
                                : props.row.original.estado === 'FINALIZADO'
                                    ?   <span>{ props.getValue() } min.</span>
                                    :   <span> - </span>
                        }
                    </>
                ),
            },
            {
                header: 'Estado',
                accessorKey: 'estado',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() === 'EN_VIAJE' ? 'green' : 'custom' } label={props.getValue()} />
                ),
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start gap-1">
                        <button onClick={() => onShowTravel( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Ver Viaje">
                            <Tooltip id="default" place="top" content="Ver Viaje" />
                            <Eye className="inline-block text-blue-500 dark:text-blue-200"></Eye>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const onShowTravel = (id: number) => {
        dispatch( setActiveTravel(id) );
        navigate(`/detalle-viaje/${id}`);
    };

    /* const initLoading = async () => {
        await dispatch( startLoadingTravels('rechazadosandfinalizados') );
    } */

    /* if (loading) {
        return <Skeleton title="Listado de Viajes Finalizados"/>;
    } */

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Viajes Finalizados</h6>
                        </div>
                    </div>
                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(travels || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={travels}/>

                    {/* { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page: number) => dispatch( startPaginateTravels('rechazadosandfinalizados', page) )}
                        />
                    )} */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default FinishTravelsTable;