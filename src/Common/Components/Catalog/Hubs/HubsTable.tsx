import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Tooltip } from 'react-tooltip'
import { Pen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "Common/Components/Pagination";
import { startDeleteHub, startLoadingHubs, startPaginateHubs } from "slices/app/catalog/hubs/thunks";
import { setActiveHub } from "slices/app/catalog/hubs/reducer";
import NoResults from "Common/NoResults";
import Modal from "Common/Components/Ui/Modal";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const HubsTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const { hubs, paginate, activeHub } = useSelector((state: any) => state.HubCatalog)

    // Modal states
    const [show, setShow] = useState<boolean>(false);

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
                header: 'Dirección',
                accessorKey: 'direccion',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Capacidad Mecanicas',
                accessorKey: 'capacidad_mecanica',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Capacidad Electricas',
                accessorKey: 'capacidad_electrica',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Cantidad de Bicicletas',
                accessorKey: 'cantidad_bicicletas',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start">
                        <button onClick={() => onEditHub( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Editar">
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className="inline-block size-5 text-slate-500 dark:text-zink-200"></Pen>
                        </button>

                        <button onClick={() => onDeleteHub( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Eliminar">
                            <Tooltip id="default" place="top" content="Eliminar" />
                            <Trash className="inline-block size-5 text-slate-500 dark:text-zink-200"></Trash>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [show]);

    const confirmAction = async (action: string) => {
        if (action === 'ELIMINAR' && activeHub) await dispatch( startDeleteHub( activeHub.id ) );
        toggle();
    }

    function onEditHub (id: number) {
        dispatch( setActiveHub(id) )
        navigate('/catalogo/nueva-estacion')
    }

    function onDeleteHub (id: number) {
        dispatch( setActiveHub(id) );
        toggle();
    }

    useEffect(() => {
        dispatch( startLoadingHubs() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card">
                <div className="card-body">
                    <div className="flex justify-between items-center gap-3 mb-5">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Estaciones</h6>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => navigate('/catalogo/nueva-estacion')}
                                type="button" 
                                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                Crear Estación
                            </button>
                        </div>
                    </div>

                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(hubs || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={hubs}/>

                    { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page) => dispatch( startPaginateHubs(page) )}
                        />
                    )}
                </div>
            </div>

            {/* Modal para eliminar una estación */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Eliminar estación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <p className="font-semibold text-center text-14">¿Desea eliminar la estación "{activeHub?.nombre}"?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="reset" onClick={() => confirmAction('CANCELAR')} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">
                            Cancelar
                        </button>
                        <button type="submit" onClick={() => confirmAction('ELIMINAR')} className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            Eliminar
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default HubsTable;