import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "Common/Components/Ui/Modal";
import ErrorAlert from "Common/Components/Ui/Alert/ErrorAlert";
import { Phone } from "lucide-react";
import { APIClient } from "helpers/api_helper";

interface FormData {
    tipo_ticket_id: string,
    comentario: string,
}

const api = new APIClient(); 
const CreateTicket = () => {
    const { activeUser } = useSelector( (state: any) => state.User );
    const dispatch = useDispatch<any>();
    
    // Modal states
    const [show, setShow] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [tickets, setTickets] = useState<any>([])

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            tipo_ticket_id: "",
            comentario: "",
        } as FormData,

        validationSchema: Yup.object({
            tipo_ticket_id: Yup.string().required("El tipo de ticket es requerido"),
            comentario: Yup.string().required("El comentario es requerido"),
        }),

        onSubmit: async (values: any) => {
            const data = {
                ...values, 
                usuario_id: activeUser.id
            };

            console.log(data)

            /* const response = await dispatch( startSavingTravel(data) )
            if (response === true) {
                toggle();
            } else {
                setErrorMessage(response)
            } */
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

    const initLoading = async () => {
        const { items }: any = await api.get('http://localhost:1000/api/v1/admin/ticket', null);
        setTickets(items);
    }

    useEffect(() => {
        initLoading()
    }, [])
    
    return (
        <React.Fragment>
            <button onClick={toggle} type="button" className="flex gap-1 min-w-40 mt-2 px-8 text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                <Phone className="inline size-4" /> Crear Ticket
            </button>

            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Crear Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <div className="xl:col-span-12">
                                <label htmlFor="tipo_ticket_id" className="inline-block mb-2 text-base font-medium">Tipo de Ticket</label>
                                <select
                                    id="tipo_ticket_id"
                                    name="tipo_ticket_id"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.tipo_ticket_id || ""}
                                >
                                    <option value="">Seleccionar un tipo</option>
                                    {
                                        tickets.length > 0 && tickets.map((tipo: any) => (
                                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                        ))
                                    }
                                </select>

                                { formik.touched.tipo_ticket_id && formik.errors.tipo_ticket_id ? (
                                    <p className="text-red-400">{ formik.errors.tipo_ticket_id }</p>
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

export default CreateTicket;