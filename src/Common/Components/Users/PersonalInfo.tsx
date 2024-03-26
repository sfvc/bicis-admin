import React from "react";
import ImageViewer from "./ImageViewer/ImageViewer";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Option { label: string; value: string; isDisabled?: boolean };

const GeneroOptions: Option[] = [
    { label: "Mujer", value: "Mujer" },
    { label: "Varón", value: "Varon" },
    { label: "Sin Especificar", value: "Sin Especificar" },
];

interface FormData {
    dni: number | null;
    nombre: string;
    apellido: string;
    genero: string;
    email: string;
    telefono: string;
}
  
const initialValues: FormData = {
    dni: null,
    nombre: "",
    apellido: "",
    genero: "",
    email: "",
    telefono: "",
};

const PersonalInfo = () => {
    const navigate = useNavigate();
    const { activeUser } = useSelector( (state: any) => state.User);

    function handleSubmit (values: FormData) {
        console.log(values);
    };

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card p-5">
                    <h6 className="mb-1 text-15">Informacion Personal</h6>
                    <Formik initialValues={activeUser || initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                <div className="xl:col-span-6">
                                    <label htmlFor="dni" className="inline-block mb-2 text-base font-medium">
                                        DNI
                                    </label>
                                    <Field type="number" id="dni" name="dni" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" />
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="nombre" className="inline-block mb-2 text-base font-medium">
                                        Nombre
                                    </label>
                                    <Field type="text" id="nombre" name="nombre" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" />
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="apellido" className="inline-block mb-2 text-base font-medium">
                                        Apellido
                                    </label>
                                    <Field type="text" id="apellido" name="apellido" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" />
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="genero" className="inline-block mb-2 text-base font-medium">
                                        Genero
                                    </label>
                                    <Field name="genero" as="select" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                        {
                                            GeneroOptions.map((genero, index) => (
                                                <option key={index} value={genero.value}>{genero.label}</option>
                                            ))
                                        }
                                    </Field>
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="email" className="inline-block mb-2 text-base font-medium">
                                        Email
                                    </label>
                                    <Field type="text" id="email" name="email" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" />
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                        Telefono
                                    </label>
                                    <Field type="text" id="telefono" name="telefono" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6 gap-x-4">
                                <button type="button" onClick={() => navigate('/usuarios')} className="text-red-500 bg-red-100 btn hover:text-white hover:bg-red-600 focus:text-white focus:bg-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:ring active:ring-red-100 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:bg-red-500 dark:focus:text-white dark:active:bg-red-500 dark:active:text-white dark:ring-red-400/20">
                                    Cancelar
                                </button>

                                <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                    Guardar
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>

                {/* Imagenes de usuario  */}
                <div className="card p-5">
                    <h6 className="mb-1 text-15">Acciones y Documentación</h6>
                    <div className="flex flex-col xl:flex-row justify-between my-4 gap-x-4">
                        <ImageViewer
                            key='Frente-Documento'
                            src="https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="snow"
                            caption="Frente de Documento"
                        />

                        <ImageViewer
                            key="Dorso-Documento"
                            src="https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="snow"
                            caption="Dorso de Documento"
                        />

                        <ImageViewer
                            key="Foto-Rostro"
                            src="https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="snow"
                            caption="Foto de Rostro"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default PersonalInfo;