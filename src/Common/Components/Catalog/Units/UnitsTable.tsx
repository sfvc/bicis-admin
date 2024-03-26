import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Tooltip } from 'react-tooltip'
import { Eye, Pen, Search, Trash } from "lucide-react";
import PigBadge from "Common/Components/Label/PigBadge";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingUnits, startSavingUnit, startUpdateUnit } from "slices/app/catalog/units/thunks";
import Modal from "Common/Components/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setActiveUnit, resetActiveUnit, handleSearchUnit } from "slices/app/catalog/units/reducer";
import { APIClient } from "helpers/api_helper";
import NoResults from "Common/NoResults";
import Pagination from "./Pagination";

export const tiposBicicleta = ['ELECTRICA', 'MECANICA']
export const estadosBicicleta = ['ACTIVO', 'INACTIVO']

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const initialValues = {
    patente: "",
    tipo: "",
    estado: ""
}

const api = new APIClient();

const UnitsTable = () => {
    const dispatch = useDispatch<any>();
    const { units, paginate, activeUnit } = useSelector( (state: any) => state.UnitCatalog )

    // Modal states
    const [show, setShow] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: activeUnit || initialValues,
        validationSchema: Yup.object({
            patente: Yup.string().required("La patente es requerida"),
            tipo: Yup.string().required("El tipo es requerido"),
            estado: Yup.string().required("El estado es requerido"),
        }),

        onSubmit: (values: any) => {
            if (activeUnit) {
                dispatch( startUpdateUnit(values, activeUnit.id) )
            } else {
                dispatch( startSavingUnit(values) )
            }
            toggle();
        },
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            activeUnit && dispatch( resetActiveUnit() );
        } else {
            setShow(true);
            formik.resetForm();
        }
    }, [show, formik]);

    const columns: column[] = React.useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Patente',
                accessorKey: 'patente',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Tipo',
                accessorKey: 'tipo',
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

                        <button className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Eliminar">
                            <Tooltip id="default" place="top" content="Eliminar" />
                            <Eye className="inline-block size-5 text-slate-500 dark:text-zink-200"></Eye>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    function onEditUnit (id: number) {
        dispatch( setActiveUnit(id) )
        toggle()
    }

    const onSearch = async ({target}: any) => {
        if(target.value === '') return dispatch( startLoadingUnits() );
        const response: any = await api.get(`http://localhost:1000/api/v1/bicicleta/search/${target.value}`, null);
        dispatch( handleSearchUnit(response) );
    }

    useEffect(() => {
        dispatch( startLoadingUnits() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Unidades</h6>
                        </div>
                        <div className="2xl:col-span-4 2xl:col-start-9">
                            <div className="flex gap-3">
                                <div className="relative grow">
                                    <input 
                                        type="text" 
                                        className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Buscar patente"
                                        autoComplete="off" 
                                        onChange={(e) => onSearch(e)} 
                                    />
                                    <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600"></Search>
                                </div>

                                <button 
                                    onClick={toggle}
                                    type="button" 
                                    className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                                >
                                    Crear Bicicleta
                                </button>
                            </div>
                        </div>
                    </div>
                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(units || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={units}/>

                    { paginate && <Pagination data={paginate} /> }

                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!activeUnit ? "Editar bicicleta" : "Nueva bicicleta"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="patente" className="inline-block mb-2 text-base font-medium">Patente</label>
                                <input 
                                    type="text" 
                                    name="patente" 
                                    id="patente" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Patente" 
                                    onChange={formik.handleChange}
                                    value={formik.values.patente}
                                />

                                { formik.touched.patente && formik.errors.patente ? (
                                    <p className="text-red-400">{ formik.errors.patente }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="tipo" className="inline-block mb-2 text-base font-medium">Tipo de Bicicleta</label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.tipo || ""}
                                >
                                    <option value="">Seleccionar un tipo</option>
                                    {
                                        tiposBicicleta.map((tipo, index) => (
                                            <option key={index} value={tipo}>{tipo}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.tipo && formik.errors.tipo ? (
                                    <p className="text-red-400">{ formik.errors.tipo }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="estado" className="inline-block mb-2 text-base font-medium">Estado</label>
                                <select
                                    id="estado"
                                    name="estado"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.estado || ""}
                                >
                                    <option value="">Seleccionar un estado</option>
                                    {
                                        estadosBicicleta.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.estado && formik.errors.estado ? (
                                    <p className="text-red-400">{ formik.errors.estado }</p>
                                ) : null }
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" onClick={toggle} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Cancelar</button>
                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                {!!activeUnit ? "Actualizar" : "Guardar"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal> 
        </React.Fragment>
    );
}

export default UnitsTable;