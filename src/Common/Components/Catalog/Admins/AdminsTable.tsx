import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Tooltip } from 'react-tooltip'
import { Pen, Search, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "Common/Components/Modal";
import { startLoadingAdmins, startSavingAdmin, startUpdateAdmin } from "slices/app/catalog/admins/thunks";
import PigBadge from "Common/Components/Label/PigBadge";
import { handleAdmins, handleSearchAdmin, setActiveAdmin } from "slices/app/catalog/admins/reducer";
import { APIClient } from "helpers/api_helper";
import NoResults from "Common/NoResults";
import Pagination from "./Pagination";

interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

const rolData = ['MONITOREO', 'ADMIN'];

const initialValues = {
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    rol: "",
}

const validationCreate = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    username: Yup.string().required("El usuario es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    rol: Yup.string().required("El rol es requerido"),
})

const validationUpdate = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    username: Yup.string().required("El usuario es requerido"),
    rol: Yup.string().required("El rol es requerido"),
})

const api = new APIClient();

const AdminsTable = () => {
    const { admins, paginate, activeAdmin } = useSelector((state: any) => state.AdminCatalog)
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
                header: 'Apellido',
                accessorKey: 'apellido',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Usuario',
                accessorKey: 'username',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Rol',
                accessorKey: 'rol',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Activo',
                accessorKey: 'activo',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() ? 'green' : 'red' } label={ props.getValue() ? 'ACTIVO' : 'INACTIVO'} />
                ),
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start gap-2">
                        <button onClick={() => onEditAdmin(props.row.original.id)} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Editar">
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className="inline-block size-5 text-slate-500 dark:text-zink-200"></Pen>
                        </button>

                        <button className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="c">
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
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {...activeAdmin, password: ""} || initialValues,
        validationSchema: activeAdmin ? validationUpdate : validationCreate,

        onSubmit: (values: any) => {
            if (activeAdmin) {
                dispatch( startUpdateAdmin(values, activeAdmin.id) )
            } else {
                dispatch( startSavingAdmin(values) )
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

    const onEditAdmin = (id: number) => {
        dispatch( setActiveAdmin(id) )
        toggle()
    }

    const onSearch = async ({target}: any) => {
        if(target.value === '') return dispatch( startLoadingAdmins() );
        const response = await api.get(`http://localhost:1000/api/v1/usuario/search/${target.value}`, null);
        dispatch( handleSearchAdmin(response) );
    }

    useEffect(() => {
        dispatch( startLoadingAdmins() )
    }, [])

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Administradores</h6>
                        </div>

                        <div className="2xl:col-span-4 2xl:col-start-9">
                            <div className="flex gap-3">
                                <div className="relative grow">
                                    <input 
                                        type="text" 
                                        className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Buscar por apellido o usuario"
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
                                    Crear Administrador
                                </button>
                            </div>
                        </div>
                    </div>
                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(admins || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={admins}/>

                    { paginate && <Pagination data={paginate} /> }
                </div>
            </div>

            {/* Modal */}
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
                                <label htmlFor="patente" className="inline-block mb-2 text-base font-medium">Apellido</label>
                                <input 
                                    type="text" 
                                    name="apellido" 
                                    id="apellido" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Apellido" 
                                    onChange={formik.handleChange}
                                    value={formik.values.apellido}
                                />

                                { formik.touched.apellido && formik.errors.apellido ? (
                                    <p className="text-red-400">{ formik.errors.apellido }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="username" className="inline-block mb-2 text-base font-medium">Usuario</label>
                                <input 
                                    type="username" 
                                    name="username" 
                                    id="username" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Usuario" 
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />

                                { formik.touched.username && formik.errors.username ? (
                                    <p className="text-red-400">{ formik.errors.username }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="nombre" className="inline-block mb-2 text-base font-medium">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Contraseña" 
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />

                                { formik.touched.password && formik.errors.password ? (
                                    <p className="text-red-400">{ formik.errors.password }</p>
                                ) : null }
                            </div>

                            <div className="xl:col-span-12">
                                <label htmlFor="rol" className="inline-block mb-2 text-base font-medium">Rol</label>
                                <select
                                    id="rol"
                                    name="rol"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.rol || ""}
                                >
                                    <option value="">Seleccionar rol</option>
                                    {
                                        rolData.map((rol, index) => (
                                            <option key={index} value={rol}>{rol}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.rol && formik.errors.rol ? (
                                    <p className="text-red-400">{ formik.errors.rol }</p>
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
        </React.Fragment>
    );
}

export default AdminsTable;