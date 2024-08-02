import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "Common/Components/Ui/Modal";
import ErrorAlert from "Common/Components/Ui/Alert/ErrorAlert";
import { Gavel } from "lucide-react";
import { APIClient } from "helpers/api_helper";
import { startSavingSanction } from "slices/app/sanctions/thunks";

interface FormData {
    fecha_vencimiento: string,
    tipo_penalidad_id: string,
    dias_sancion: number,
    dias_bloqueo: number,
    comentario: string,
}

const ID_PROVISORIO = 1;
const api = new APIClient(); 

const Sanction = () => {
    const { activeTravel } = useSelector( (state: any) => state.Travel );
    const dispatch = useDispatch<any>();

    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [penalties, setPenalties] = useState<any>([])

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            fecha_vencimiento: "",
            tipo_penalidad_id: "",
            dias_sancion: 0,
            dias_bloqueo: 0,
            comentario: "",
        } as FormData,

        validationSchema: Yup.object({
            fecha_vencimiento: Yup.string().required("La fecha de vencimiento es requerida"),
            tipo_penalidad_id: Yup.string().required("El tipo de penalidad es requerida"),
            dias_sancion: Yup.string().required("Los dias de sanción son requeridos"),
            dias_bloqueo: Yup.string().nullable(),
            comentario: Yup.string().nullable(),
        }),

        onSubmit: async (values: any) => {
            const data = {
                ...values, 
                viaje_id: activeTravel.id,
                usuario_id: activeTravel.usuario?.id || ID_PROVISORIO, //TODO: Sacar id provisorio.
                estado: 'EN REVISIÓN' // 'EN REVISIÓN', 'ACEPTADA', 'RECHAZADA'
            };

            const response = await dispatch( startSavingSanction(data) )
            if (response === true) {
                toggle();
            } else {
                setErrorMessage(response)
            }
        }
    });

    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            formik.resetForm();
        }
    }, [show, formik]);

    const handleNumericChange = (fieldName: string, value: string) => formik.setFieldValue(fieldName, parseInt(value));

    const initLoading = async () => {
        const { items }: any = await api.get('/admin/penalidad', null);
        setPenalties(items);
    }

    useEffect(() => {
        initLoading()
    }, [])

    return (
        <React.Fragment>
            <button onClick={toggle} type="button" className="flex gap-1 min-w-40 mt-2 px-8 text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                <Gavel className="inline size-4" /> Sancionar
            </button>

            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Nueva Sanción</Modal.Title>
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
                                    value={formik.values.fecha_vencimiento}
                                    onChange={formik.handleChange} 
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
                                    onChange={(e) => handleNumericChange("tipo_penalidad_id", e.target.value)}
                                    value={formik.values.tipo_penalidad_id || ""}
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

                            <div className="xl:col-span-6">
                                <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                    Dias de Sanción
                                </label>
                                <input 
                                    type="number" 
                                    id="dias_sancion" 
                                    name="dias_sancion" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Fecha de Vencimiento"
                                    value={formik.values.dias_sancion}
                                    onChange={formik.handleChange} 
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
                                    placeholder="Fecha de Vencimiento"
                                    value={formik.values.dias_bloqueo}
                                    onChange={formik.handleChange} 
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

export default Sanction;