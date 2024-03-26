import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from 'react-tooltip'
import { useFormik } from "formik";
import { CheckCircle, Search } from "lucide-react";
import TableContainer from "Common/TableContainer";
import PigBadge from "../../Label/PigBadge";
import Modal from "Common/Components/Modal";
import { getAllHubs } from "helpers/api_select";
import * as Yup from "yup";
import { setActiveTravel } from "slices/app/travel/reducer";
import { startCloseTravel, startLoadingTravels } from "slices/app/travel/thunks";
import NoResults from "Common/NoResults";
import Pagination from "./Pagination";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

interface FormData {
    estacion_final_id: string,
}

const TravelsTable = () => {
    const { travels, paginate, activeTravel } = useSelector( (state: any) => state.Travel );
    const dispatch = useDispatch<any>();

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
                accessorKey: 'persona',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span>{props.getValue().nombre} {props.getValue().apellido}</span>
                ),
            },
            {
                header: 'Tipo de unidad',
                accessorKey: 'bicicleta.tipo',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() === 'ELECTRICA' ? 'yellow' : 'purple' } label={props.getValue()} />
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
                    <span>{props.getValue() || '-'}</span>
                ),
            },
            {
                header: 'Duracion',
                accessorKey: 'duracion',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span>{props.getValue() || '-'}</span>
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
                    <div className="flex flex-wrap justify-start gap-2">
                        {
                            (props.row.original.estado === 'EN_VIAJE') && (
                                <button onClick={() => onCloseTravel( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Finalizar">
                                    <Tooltip id="default" place="top" content="Finalizar" />
                                    <CheckCircle className="inline-block size-5 text-green-500 dark:text-green-200"></CheckCircle>
                                </button>
                            )
                        }
                    </div>
                ),
            },
        ],
        []
    );

    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [hubs, setHubs] = useState<any>([]);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            estacion_final_id: activeTravel?.estacion_final_id || ""
        } as FormData,

        validationSchema: Yup.object({
            estacion_final_id: Yup.string().required("La estación es requerida"),
        }),

        onSubmit: (values: any) => {
            dispatch( startCloseTravel(values, activeTravel.id) )
            toggle();
        },
    });

    const handleNumericChange = (fieldName: string, value: string) => {
        formik.setFieldValue(fieldName, parseInt(value));
    };

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            formik.resetForm();
        }
    }, [show, formik]);

    const getHubsToSelect = async () => {
        const data = await getAllHubs();
        setHubs(data);
    };

    const onCloseTravel = (id: number) => {
        dispatch( setActiveTravel(id) );
        toggle()
    };
        
    useEffect(() => {
        dispatch( startLoadingTravels() )
        getHubsToSelect();
    }, []);

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Viajes</h6>
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

                    {paginate && <Pagination data={paginate} />}
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Finalizar Viaje</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="estacion_final_id" className="inline-block mb-2 text-base font-medium">Estación de Destino</label>
                                <select
                                    id="estacion_final_id"
                                    name="estacion_final_id"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={(e) => handleNumericChange('estacion_final_id', e.target.value)}
                                        value={formik.values.estacion_final_id || ""}
                                >
                                    <option value="">Seleccionar una estación</option>
                                    {
                                        hubs.length > 0 && hubs.map((hub: any) => (
                                            <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.estacion_final_id && formik.errors.estacion_final_id ? (
                                    <p className="text-red-400">{ formik.errors.estacion_final_id }</p>
                                ) : null }
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10" onClick={toggle}>Cancelar</button>
                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Finalizar
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default TravelsTable;