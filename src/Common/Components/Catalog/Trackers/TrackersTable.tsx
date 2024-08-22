import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip'
import { useFormik } from "formik";
import * as Yup from "yup";
import TableContainer from "Common/TableContainer";
import { Pen, Search, Trash } from "lucide-react";
import PigBadge from "Common/Components/Ui/Label/PigBadge";
import Modal from "Common/Components/Ui/Modal";
import { APIClient } from "helpers/api_helper";
import ErrorAlert from "Common/Components/Ui/Alert/ErrorAlert";
import bike from 'assets/images/bike.png'
import { startDeleteTracker, startLoadingTrackers, startPaginateTrackers, startSavingTracker, startUpdateTracker } from "slices/app/catalog/trackers/thunks";
import { handleSearchTracker, resetActiveTracker, setActiveTracker } from "slices/app/catalog/trackers/reducer";
import Pagination from "Common/Components/Pagination";
import NoResults from "Common/NoResults";
import { getSearchUnits } from "helpers/api_select";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const initialValues = {
    traccar_id: "",
    imei: ""
}

const api = new APIClient();

const TrackersTable = () => {
    const dispatch = useDispatch<any>();
    const { trackers, paginate, activeTracker } = useSelector( (state: any) => state.TrackerCatalog );
    const [errorMessage, setErrorMessage] = useState<string>('');

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Codigo',
                accessorKey: 'codigo',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Patente',
                accessorKey: 'bicicleta.patente',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tipo',
                accessorKey: 'bicicleta.tipo_de_unidad',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'IMEI',
                accessorKey: 'imei',
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
                        <button onClick={() => onEditUnit( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Editar">
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className="inline-block size-5 text-slate-500 dark:text-zink-200"></Pen>
                        </button>

                        <button onClick={() => onDeleteUnit( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Eliminar">
                            <Tooltip id="default" place="top" content="Eliminar" />
                            <Trash className="inline-block size-5 text-slate-500 dark:text-zink-200"></Trash>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: activeTracker || initialValues,
        validationSchema: Yup.object({
            traccar_id: Yup.string().required("El traccar es requerido"),
            imei: Yup.string().required("El imei es requerido")
        }),

        onSubmit: async (values: any) => {
            console.log(values);
            let response;

            if (activeTracker) {
                response = await dispatch( startUpdateTracker(values, activeTracker.id) )
            } else {
                response = await dispatch( startSavingTracker(values) )
            }

            if(response === true) toggle();
            else setErrorMessage(response);
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            activeTracker && dispatch( resetActiveTracker() );
            setErrorMessage('');
        } else {
            setShow(true);
            formik.resetForm();
        }
    }, [show, formik]);

    const toggleDelete = useCallback(() => {
        if (showDelete) {
            setShowDelete(false);
            activeTracker && dispatch( resetActiveTracker() );
        } else {
            setShowDelete(true);
        }
    }, [showDelete]);

    const confirmAction = async (action: string) => {
        if (action === 'ELIMINAR' && activeTracker) await dispatch( startDeleteTracker( activeTracker.id ) );
        toggleDelete();
    }

    function onEditUnit (id: number) {
        dispatch( setActiveTracker(id) );
        toggle();
    }

    function onDeleteUnit (id: number) {
        dispatch( setActiveTracker(id) );
        toggleDelete();
    }

    const onSearch = async ({target}: any) => {
        if(target.value === '') return dispatch( startLoadingTrackers() );
        const response: any = await api.get(`/tracker/search/${target.value}`, null);
        dispatch( handleSearchTracker(response) );
    }

    useEffect(() => {
        dispatch( startLoadingTrackers() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">

                <div className="flex justify-between items-center gap-3 mb-5">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Trackers</h6>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={toggle}
                                type="button" 
                                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                Crear Tracker
                            </button>
                        </div>
                    </div>

                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(trackers || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={trackers}/>

                    { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page: number) => dispatch( startPaginateTrackers(page) )}
                        />
                    )}

                </div>
            </div>

            {/* Modal para crear un tracker */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!activeTracker ? "Editar tracker" : "Nuevo tracker"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="imei" className="inline-block mb-2 text-base font-medium">Imei</label>
                                <input 
                                    type="text" 
                                    name="imei" 
                                    id="imei" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Imei" 
                                    onChange={formik.handleChange}
                                    value={formik.values.imei}
                                />

                                { formik.touched.imei && formik.errors.imei ? (
                                    <p className="text-red-400">{ formik.errors.imei }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="traccar_id" className="inline-block mb-2 text-base font-medium">Traccar</label>
                                <input 
                                    type="text" 
                                    name="traccar_id" 
                                    id="traccar_id" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Traccar ID" 
                                    onChange={formik.handleChange}
                                    value={formik.values.traccar_id}
                                />

                                { formik.touched.traccar_id && formik.errors.traccar_id ? (
                                    <p className="text-red-400">{ formik.errors.traccar_id }</p>
                                ) : null }
                            </div>
                        </div>

                        {
                            errorMessage && <ErrorAlert message={errorMessage}/>
                        }

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" onClick={toggle} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Cancelar</button>
                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                {!!activeTracker ? "Actualizar" : "Guardar"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal> 

            {/* Modal para eliminar tracker */}
            <Modal show={showDelete} onHide={toggleDelete} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Eliminar tracker</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <p className="font-semibold text-center text-16 mb-2">¿Desea eliminar el tracker "{activeTracker?.id}"?</p>

                    <div className="mx-auto w-48 h-48">
                        <img src={bike} alt="Imagen de Tracker" />
                    </div>

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

export default TrackersTable;