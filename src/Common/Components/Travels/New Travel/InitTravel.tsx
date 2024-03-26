import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllHubs, getAllUnits } from "helpers/api_select";
import Modal from "Common/Components/Modal";
import { startSavingTravel } from "slices/app/travel/thunks";
import { useNavigate } from "react-router-dom";

interface FormData {
    estacion_inicio_id: string,
    estacion_final_id: string,
    bicicleta_id: string
}

const InitTravel = () => {
    const { activeUser } = useSelector( (state: any) => state.User );
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

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
            estacion_inicio_id: Yup.string().required("Please Enter Date"),
            estacion_final_id: Yup.string().required("Please Enter Date"),
            bicicleta_id: Yup.string().required("Please Enter Date"),
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

    const handleNumericChange = (fieldName: string, value: string) => {
        formik.setFieldValue(fieldName, parseInt(value));
    };
        
    useEffect(() => {
        getHubsToSelect();
        getUnitsToSelect();
    }, []);

    return (
        <React.Fragment>
            <button onClick={toggle} type="button" className="px-8 text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Iniciar Viaje</button>

            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Nuevo Viaje</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
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
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default InitTravel;