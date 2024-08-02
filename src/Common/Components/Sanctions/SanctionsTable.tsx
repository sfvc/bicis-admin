import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Tooltip } from 'react-tooltip'
import { Ban, Eye, Pen } from "lucide-react";
import PigBadge from "Common/Components/Ui/Label/PigBadge";
import { useDispatch, useSelector } from "react-redux";
import Modal from "Common/Components/Ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import NoResults from "Common/NoResults";
import Pagination from "Common/Components/Pagination";
import ErrorAlert from "Common/Components/Ui/Alert/ErrorAlert";
import penality from 'assets/images/penality.png'
import { setActiveSanction } from "slices/app/sanctions/reducer";
import { startDeleteSanction, startLoadingSanctions, startPaginateSanctions, startUpdateSanction } from "slices/app/sanctions/thunks";
import { APIClient } from "helpers/api_helper";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const initialValues = {
    fecha_vencimiento: "",
    tipo_penalidad: "",
    estado: "EN REVISIÓN",
    dias_sancion: 0,
    dias_bloqueo: 0,
    comentario: ""
}

const estados = ['EN REVISIÓN','ACEPTADA','RECHAZADA']

const api = new APIClient(); 

const SanctionsTable = () => {
    const dispatch = useDispatch<any>();
    const { sanctions, paginate, activeSanction } = useSelector( (state: any) => state.Sanction );
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [penalties, setPenalties] = useState<any>([]);

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Fecha de Generación',
                accessorKey: 'created_at',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span> { new Date(props.row.original.created_at).toLocaleString() } </span>
                )
            },
            {
                header: 'Usuario',
                accessorKey: 'usuario',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span> {props.row.original.usuario.apellido} {props.row.original.usuario.nombre} </span>
                )
            },
            {
                header: 'Nro. de viaje',
                accessorKey: 'viaje_id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tipo de Penalidad',
                accessorKey: 'tipo_penalidad',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <span> {props.row.original.tipo_penalidad?.nombre}</span>
                )
            },
            {
                header: 'Días',
                accessorKey: 'dias_bloqueo',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Estado',
                accessorKey: 'estado',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (<PigBadge color="custom" label={props.getValue()} />)
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start gap-2">
                        <button onClick={() => onEditSanction( props.row.original.id, 'SHOW' )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Ver">
                            <Tooltip id="default" place="top" content="Ver" />
                            <Eye className="inline-block size-5 text-slate-500 dark:text-zink-200"></Eye>
                        </button>

                        <button onClick={() => onEditSanction( props.row.original.id, 'EDIT' )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Editar">
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className="inline-block size-5 text-slate-500 dark:text-zink-200"></Pen>
                        </button>

                        <button onClick={() => onDeleteSanction( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Desestimar">
                            <Tooltip id="default" place="top" content="Eliminar" />
                            <Ban className="inline-block size-5 text-slate-500 dark:text-zink-200"></Ban>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: activeSanction || initialValues,
        validationSchema: Yup.object({
            fecha_vencimiento: Yup.string().required("La fecha de vencimiento es requerida"),
            tipo_penalidad_id: Yup.string().required("El tipo de penalidad es requerida"),
            estado: Yup.string().required("El estado es requerido"),
            dias_bloqueo: Yup.string().required("Los dias de sanción son requeridos"),
            dias_sancion: Yup.string().nullable(),
            comentario: Yup.string().nullable(),
        }),

        onSubmit: async (values: any) => {
            let response;

            console.log(values)
            if (activeSanction) {
                response = await dispatch( startUpdateSanction(values, activeSanction.id) );
            }

            if(response === true) toggle();
            else setErrorMessage(response);
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setDisabled(false);
        } else {
            setShow(true);
            formik.resetForm();
        }
    }, [show, formik]);

    const toggleDelete = useCallback(() => {
        if (showDelete) {
            setShowDelete(false);
        } else {
            setShowDelete(true);
        }
    }, [showDelete]);

    const confirmAction = async (action: string) => {
        if (action === 'DESESTIMAR' && activeSanction) await dispatch( startDeleteSanction( activeSanction.id ) );
        toggleDelete();
    }

    function onEditSanction (id: number, action: string) {
        if(action === 'SHOW') setDisabled(true);
        dispatch( setActiveSanction(id) );
        toggle();
    }

    function onDeleteSanction (id: number) {
        dispatch( setActiveSanction(id) );
        toggleDelete();
    }

    const initLoading = async () => {
        dispatch( startLoadingSanctions() )
        const { items }: any = await api.get('/admin/penalidad', null);
        setPenalties(items);
    }

    useEffect(() => {
        initLoading()
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="flex justify-between items-center gap-3 mb-5">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Sanciones</h6>
                        </div>
                    </div>

                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(sanctions || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={sanctions}/>

                    { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page) => dispatch( startPaginateSanctions(page) )}
                        />
                    )}

                </div>
            </div>

            {/* Modal para editar una sanción */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Editar Sanción</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            return false;
                        }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                    Fecha de Vencimiento
                                </label>
                                <input 
                                    type="date" 
                                    id="fecha_vencimiento" 
                                    name="fecha_vencimiento" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Fecha de Vencimiento"
                                    value={formik.values.fecha_vencimiento ? formik.values.fecha_vencimiento.split('T')[0] : ''}
                                    onChange={formik.handleChange} 
                                    disabled={disabled}
                                />
                                
                                { formik.touched.fecha_vencimiento && formik.errors.fecha_vencimiento ? (
                                    <p className="text-red-400">{ formik.errors.fecha_vencimiento }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="tipo_penalidad_id" className="inline-block mb-2 text-base font-medium">Tipo de Penalidad</label>
                                <select
                                    id="tipo_penalidad_id"
                                    name="tipo_penalidad_id"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={(e) => formik.setFieldValue("tipo_penalidad_id", e.target.value)}
                                    value={formik.values.tipo_penalidad_id || ""}
                                    disabled={disabled}
                                >
                                    <option value="">Seleccionar un tipo</option>
                                    {
                                        penalties.length > 0 && penalties.map((penalty: any) => (
                                            <option key={penalty.id} value={penalty.id}>{penalty.nombre}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.tipo_penalidad_id && formik.errors.tipo_penalidad_id ? (
                                    <p className="text-red-400">{ formik.errors.tipo_penalidad_id }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="estado" className="inline-block mb-2 text-base font-medium">Estado</label>
                                <select
                                    id="estado"
                                    name="estado"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={(e) => formik.setFieldValue("estado", e.target.value)}
                                    value={formik.values.estado || ""}
                                    disabled={disabled}
                                >
                                    <option value="">Seleccionar un estado</option>
                                    {
                                        estados.length > 0 && estados.map((estado: string) => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.estado && formik.errors.estado ? (
                                    <p className="text-red-400">{ formik.errors.estado }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                    Dias de Sanción
                                </label>
                                <input 
                                    type="number" 
                                    id="dias_sancion" 
                                    name="dias_sancion" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Dias de Sanción"
                                    value={formik.values.dias_sancion}
                                    onChange={formik.handleChange} 
                                    min={0}
                                    disabled={disabled}
                                />
                                
                                { formik.touched.dias_sancion && formik.errors.dias_sancion ? (
                                    <p className="text-red-400">{ formik.errors.dias_sancion }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                    Dias de Bloqueo
                                </label>
                                <input 
                                    type="number" 
                                    id="dias_bloqueo" 
                                    name="dias_bloqueo" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Dias de Bloqueo"
                                    value={formik.values.dias_bloqueo}
                                    onChange={formik.handleChange} 
                                    min={0}
                                    disabled={disabled}
                                />
                                
                                { formik.touched.dias_bloqueo && formik.errors.dias_bloqueo ? (
                                    <p className="text-red-400">{ formik.errors.dias_bloqueo }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="comentario" className="inline-block mb-2 text-base font-medium">Comentario</label>
                                <textarea 
                                    id="comentario" 
                                    name="comentario"
                                    className="w-full form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Agregar un comentario"
                                    value={formik.values.comentario || ""}
                                    onChange={formik.handleChange} 
                                    rows={4}
                                    disabled={disabled}
                                    >
                                </textarea>

                                { formik.touched.comentario && formik.errors.comentario ? (
                                    <p className="text-red-400">{ formik.errors.comentario }</p>
                                ) : null }
                            </div>
                        </div>

                        {
                            errorMessage && <ErrorAlert message={errorMessage}/>
                        }

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10" onClick={toggle}>
                                {disabled ? 'Cerrar' : 'Cancelar'}
                            </button>

                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Guardar
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal> 

            {/* Modal para desestimar una sanción */}
            <Modal show={showDelete} onHide={toggleDelete} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Desestimar Sanción</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <p className="font-semibold text-center text-16 mb-2">¿Desea desestimar la sanción?</p>

                    <div className="mx-auto w-48 h-48">
                        <img src={penality} alt="Imagen de Bicicleta" />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="reset" onClick={() => confirmAction('CANCELAR')} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">
                            Cancelar
                        </button>
                        <button type="submit" onClick={() => confirmAction('DESESTIMAR')} className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            Desestimar
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default SanctionsTable;