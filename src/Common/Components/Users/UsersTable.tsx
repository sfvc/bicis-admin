import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "Common/TableContainer";
import PigBadge from "../Label/PigBadge";
import { Tooltip } from 'react-tooltip'
import { BadgeCheck, Bike, Eye, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "slices/app/user/reducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../Modal";
import avatar1 from "assets/images/users/avatar-1.png";
import { getAllHubs, getAllUnits } from "helpers/api_select";
import { startSavingTravel } from "slices/app/travel/thunks";
import { startLoadingUsers } from "slices/app/user/thunks";
import NoResults from "Common/NoResults";
import Pagination from "./Pagination";


interface column { header: string; accessorKey: string; enableColumnFilter: boolean; enableSorting: boolean };

interface FormData {
    estacion_inicio_id: string,
    estacion_final_id: string,
    bicicleta_id: string
}

const UserTable = () => {
    const { users, paginate, activeUser } = useSelector( (state: any) => state.User ) // Usuario de bicicleta
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

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
                header: 'Email',
                accessorKey: 'email',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'DNI',
                accessorKey: 'dni',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Activo',
                accessorKey: 'activo',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <PigBadge color={ props.getValue() === true ? 'green' : 'red' } label={ props.getValue() === true ? 'Activo' : 'Inactivo' } />
                ),
            },
            {
                header: 'Acciones',
                accessorKey: 'acciones',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (props: any) => (
                    <div className="flex flex-wrap justify-start gap-2">
                        <button onClick={() => showUser( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Ver">
                            <Tooltip id="default" place="top" content="Ver" />
                            <Eye className="inline-block size-5 text-slate-500 dark:text-zink-200"></Eye>
                        </button>

                        <button onClick={() => startTravel( props.row.original.id )} className="flex items-center justify-center size-8 hover:border rounded-md border-slate-200 dark:border-zink-500" data-tooltip-id="default" data-tooltip-content="Iniciar Viaje">
                            <Tooltip id="default" place="top" content="Iniciar Viaje" />
                            <Bike className="inline-block size-5 text-slate-500 dark:text-zink-200"></Bike>
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [hubs, setHubs] = useState<any>([]);
    const [units, setUnits] = useState<any>([]);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            estacion_inicio_id: "",
            estacion_final_id: "",
            bicicleta_id: ""
        } as FormData,

        validationSchema: Yup.object({
            estacion_inicio_id: Yup.string().required("La estación es requerida"),
            estacion_final_id: Yup.string().required("La estación es requerida"),
            bicicleta_id: Yup.string().required("La bicicleta es requerida"),
        }),

        onSubmit: (values: any) => {
            const data = {
                ...values, 
                persona_id: activeUser.id,
            };
            dispatch( startSavingTravel(data) )
            toggle();
            navigate('/viajes')
        },
    });

    // Función para manejar valores numéricos
    const handleNumericChange = (fieldName: string, value: string) => {
        formik.setFieldValue(fieldName, parseInt(value));
    };

    const showUser = (id: number) => {
        dispatch( setActiveUser(id) );
        navigate(`/usuarios/${id}`);
    };

    const startTravel = (id: number) => {
        dispatch( setActiveUser(id) )
        toggle();
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

    const getUnitsToSelect = async () => {
        const response: any = await getAllUnits(); //TODO: Agregar endpoint de bicicletas sin paginar o buscador
        setUnits(response.items);
    };
        
    useEffect(() => {
        dispatch( startLoadingUsers() );
        getHubsToSelect();
        getUnitsToSelect();
    }, []);

    return (
        <React.Fragment>
            <div className="col-span-12 card 2xl:col-span-12">
                <div className="card-body">
                    <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                        <div className="2xl:col-span-3">
                            <h6 className="text-15">Listado de Usuarios</h6>
                        </div>
                    </div>
                    <TableContainer
                        isPagination={false}
                        columns={(columns || [])}
                        data={(users || [])}
                        customPageSize={7}
                        divclassName="overflow-x-auto"
                        tableclassName="w-full whitespace-nowrap"
                        theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:text-zink-200 dark:bg-zink-600"
                        thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-y border-slate-200 dark:border-zink-500"
                        tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                        PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                    />

                    <NoResults data={users}/>
                    

                    { paginate && <Pagination data={paginate}/>}
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Iniciar Viaje</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">

                    {
                        activeUser && (
                            <>
                                <div className="card p-5">
                                    <div className="flex items-center gap-x-5">
                                        <div>
                                            <div className="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28">
                                                <img src={avatar1} alt="Foto de usuario" className="object-cover border-0 rounded-full img-thumbnail user-profile-image" />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-10 2xl:col-span-9">
                                            <h5 className="mb-1">{activeUser.nombre} {activeUser.apellido}<BadgeCheck className="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20"></BadgeCheck></h5>
                                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                                <p className="text-slate-500 dark:text-zink-200"><MapPin className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></MapPin> Argentina</p>
                                                <p className="text-slate-500 dark:text-zink-200"><Phone className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></Phone> Cel: {activeUser.telefono}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form action="#!" onSubmit={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                    return false;
                                }}>
                                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                                        <div className="xl:col-span-12">
                                            <label htmlFor="estacion_inicio_id" className="inline-block mb-2 text-base font-medium">Estacion de Origen</label>
                                            <select
                                                id="estacion_inicio_id"
                                                name="estacion_inicio_id"
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                onChange={(e) => handleNumericChange("estacion_inicio_id", e.target.value)}
                                                value={formik.values.estacion_inicio_id || ""}
                                            >
                                                <option value="">Seleccionar una estación</option>
                                                {
                                                    hubs.length > 0 && hubs.map((hub: any) => (
                                                        <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                                    ))
                                                }
                                            </select>

                                            { formik.touched.estacion_inicio_id && formik.errors.estacion_inicio_id ? (
                                                <p className="text-red-400">{ formik.errors.estacion_inicio_id }</p>
                                            ) : null }
                                        </div>

                                        <div className="xl:col-span-12">
                                            <label htmlFor="estacion_final_id" className="inline-block mb-2 text-base font-medium">Estacion de Destino</label>
                                            <select
                                                id="estacion_final_id"
                                                name="estacion_final_id"
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                onChange={(e) => handleNumericChange("estacion_final_id", e.target.value)}
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

                                        <div className="xl:col-span-12">
                                            <label htmlFor="bicicleta_id" className="inline-block mb-2 text-base font-medium">Bicicleta</label>
                                            <select
                                                id="bicicleta_id"
                                                name="bicicleta_id"
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                onChange={(e) => handleNumericChange("bicicleta_id", e.target.value)}
                                                    value={formik.values.bicicleta_id || ""}
                                            >
                                                <option value="">Seleccionar una bicicleta</option>
                                                {
                                                    units.length > 0 && units.map((unit: any) => (
                                                        <option key={unit.id} value={unit.id}>{unit.patente}</option>
                                                    ))
                                                }
                                            </select>

                                            { formik.touched.bicicleta_id && formik.errors.bicicleta_id ? (
                                                <p className="text-red-400">{ formik.errors.bicicleta_id }</p>
                                            ) : null }
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10" onClick={toggle}>Cancelar</button>
                                        <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </>
                        )
                    }
  
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default UserTable;