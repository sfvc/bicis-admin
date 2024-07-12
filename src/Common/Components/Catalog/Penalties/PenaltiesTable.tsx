import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Tooltip } from 'react-tooltip'
import { Pen, Search, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "Common/Components/Ui/Modal";
import { APIClient } from "helpers/api_helper";
import NoResults from "Common/NoResults";
import Pagination from "Common/Components/Pagination";
import { startDeletePenalty, startLoadingPenalties, startPaginatePenalties, startSavingPenalty, startUpdatePenalty } from "slices/app/catalog/penalty/thunks";
import { setActivePenalty } from "slices/app/catalog/penalty/reducer";
import penality from "assets/images/penality.png"

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const tipoPenalidadData = ['GRAVE', 'MODERADO', 'LEVE', 'APLICADA'];

const initialValues = {
    nombre: "",
    tipo_penalidad: "",
    dias: "",
    descripcion: "",
}

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    tipo_penalidad: Yup.string().required("El tipo de penalidad es requerido"),
    dias: Yup.string().required("Los días son requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
})

const PenaltiesTable = () => {
    const { penalties, paginate, activePenalty } = useSelector( (state: any) => state.PenaltyCatalog )
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
                header: 'Nombre',
                accessorKey: 'nombre',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tipo de Penalidad',
                accessorKey: 'tipo_penalidad',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Valores en Dias',
                accessorKey: 'dias',
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
                        <button onClick={() => onEditPenalty(props.row.original.id)} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Editar">
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className="inline-block size-5 text-slate-500 dark:text-zink-200"></Pen>
                        </button>

                        <button onClick={() => onDeletePenalty(props.row.original.id)} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Eliminar">
                            <Tooltip id="default" place="top" content="Editar" />
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
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: activePenalty || initialValues,
        validationSchema: validationSchema,

        onSubmit: async (values: any) => {
            if (activePenalty) {
                await dispatch( startUpdatePenalty(values, activePenalty.id) )
            } else {
                await dispatch( startSavingPenalty(values) )
            }
            toggle();
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setIsEdit(false);
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

    const onEditPenalty = (id: number) => {
        dispatch( setActivePenalty(id) );
        toggle();
    }
    
    const onDeletePenalty = (id: number) => {
        dispatch( setActivePenalty(id) );
        toggleDelete();
    }

    const confirmAction = async (action: string) => {
        if (action === 'ELIMINAR' && activePenalty) await dispatch( startDeletePenalty( activePenalty.id ) );
        toggleDelete();
    }

    useEffect(() => {
        dispatch( startLoadingPenalties() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="flex justify-between items-center gap-3 mb-5">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Penalidades</h6>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={toggle}
                                type="button" 
                                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                Crear Tipo de Penalidad
                            </button>
                        </div>
                    </div>

                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(penalties || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={penalties}/>

                    { paginate && (
                        <Pagination
                            data={paginate}
                            onPageChange={(page) => dispatch( startPaginatePenalties(page) )}
                        />
                    )}
                </div>
            </div>

            {/* Modal para crear un tipo de penalidad */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Editar usuario" : "Nuevo usuario"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="nombre" className="inline-block mb-2 text-base font-medium">Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    id="nombre" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Nombre" 
                                    onChange={formik.handleChange}
                                    value={formik.values.nombre}
                                />

                                { formik.touched.nombre && formik.errors.nombre ? (
                                    <p className="text-red-400">{ formik.errors.nombre }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="rol" className="inline-block mb-2 text-base font-medium">Tipo de Penalidad</label>
                                <select
                                    id="tipo_penalidad"
                                    name="tipo_penalidad"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.tipo_penalidad || ""}
                                >
                                    <option value="">Seleccionar tipo de penalidad</option>
                                    {
                                        tipoPenalidadData.map((tipo, index) => (
                                            <option key={index} value={tipo}>{tipo}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.rol && formik.errors.rol ? (
                                    <p className="text-red-400">{ formik.errors.rol }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="dias" className="inline-block mb-2 text-base font-medium">Valor en Dias</label>
                                <input 
                                    type="number" 
                                    name="dias" 
                                    id="dias" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Dias" 
                                    onChange={formik.handleChange}
                                    value={formik.values.dias}
                                />

                                { formik.touched.dias && formik.errors.dias ? (
                                    <p className="text-red-400">{ formik.errors.dias }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="descripcion" className="inline-block mb-2 text-base font-medium">Descripción</label>
                                <textarea 
                                    name="descripcion" 
                                    id="descripcion" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Descripción" 
                                    onChange={formik.handleChange}
                                    value={formik.values.descripcion}
                                    rows={4}
                                />

                                { formik.touched.descripcion && formik.errors.descripcion ? (
                                    <p className="text-red-400">{ formik.errors.descripcion }</p>
                                ) : null }
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10" onClick={toggle}>Cancelar</button>
                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                {!!isEdit ? "Actualizar" : "Guardar"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal para eliminar un tipo de penalidad */}
            <Modal show={showDelete} onHide={toggleDelete} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Eliminar Tipo de Penalidad</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <p className="font-semibold text-center text-16 mb-2">¿Desea eliminar la penalidad "{activePenalty?.nombre}"?</p>

                    <div className="mx-auto w-48 h-48">
                        <img src={penality} alt="Imagen de Penalidad" />
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

export default PenaltiesTable;