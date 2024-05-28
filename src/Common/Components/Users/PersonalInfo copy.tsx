import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ImageViewer from "./ImageViewer/ImageViewer";
import * as Yup from "yup";
import Modal from "../Ui/Modal";
import axios from "axios";

interface Option { label: string; value: string; isDisabled?: boolean };

const GeneroOptions: Option[] = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "Sin Especificar", value: "Sin Especificar" },
];

interface FormData {
    documento_numero: string;
    nombre: string;
    apellido: string;
    genero: string;
    email: string;
    numero_celular: string;
    comentario: string;
    documento_frontal: string | null;
    documento_dorsal: string | null;
    foto: string | null;
    documentacion_menor: string | null
}
  
const initialValues: FormData = {
    documento_numero: "",
    nombre: "",
    apellido: "",
    genero: "",
    email: "",
    numero_celular: "",
    comentario: "",
    documento_frontal: null,
    documento_dorsal: null,
    foto: null,
    documentacion_menor: null
};

const PersonalInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { activeUser } = useSelector( (state: any) => state.User );

    const [file, setFile] = useState<any>(null);
    const [message, setMessage] = useState('');

    // Modal states
    const [show, setShow] = useState<boolean>(false);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: activeUser || initialValues,
        validationSchema: Yup.object({
            documento_numero: Yup.string().required("El DNI es requerido"),
            nombre: Yup.string().required("El nombre es requerido"),
            apellido: Yup.string().required("El apellido es requerido"),
            genero: Yup.string().required("El genero es requerido"),
            email: Yup.string().required("El email es requerido"),
            numero_celular: Yup.string().required("El telefono es requerido"),
            comentario: Yup.string().nullable(),
            documento_frontal: Yup.string().nullable(),
            documento_dorsal: Yup.string().nullable(),
            foto: Yup.string().nullable(),
            documentacion_menor: Yup.string().nullable()
        }),

        onSubmit: (values: any) => {
            console.log(values)
            // dispatch( startUpdateUser(data) )
            // toggle();
            // navigate('/usuarios')
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

    const handleChangeDoc = async (e: any) => {
        const fieldName = e.target.name

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
            return null
        }

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const authUser = localStorage.getItem("authUser");
            if(!authUser) return null
            const {token} = JSON.parse(authUser)

            const response: any = await axios.post('http://localhost:1000/api/v1/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                }
            });
            console.log(response)

            // Agrego la nueva url al formulario de edicion de datos
            handleInputChange(fieldName, response.url)
            setMessage('Archivo subido exitosamente');
        } catch (error) {
            setMessage('Error al subir el archivo');
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        console.log(fieldName, value)
        formik.setFieldValue(fieldName, value);
    };
   
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card p-5">
                    <h6 className="mb-1 text-15">Información Personal</h6>
                        <form action="#!" onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            return false;
                        }}>
                            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                <div className="xl:col-span-6">
                                    <label htmlFor="dni" className="inline-block mb-2 text-base font-medium">
                                        DNI
                                    </label>
                                    <input 
                                        type="number" 
                                        id="documento_numero" 
                                        name="documento_numero" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="DNI" 
                                        value={formik.values.documento_numero}
                                        onChange={formik.handleChange}
                                    />
                                    
                                    { formik.touched.documento_numero && formik.errors.documento_numero ? (
                                        <p className="text-red-400">{ formik.errors.documento_numero }</p>
                                    ) : null }
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="nombre" className="inline-block mb-2 text-base font-medium">
                                        Nombre
                                    </label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="nombre" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Nombre" 
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}
                                    />
                                    
                                    { formik.touched.nombre && formik.errors.nombre ? (
                                        <p className="text-red-400">{ formik.errors.nombre }</p>
                                    ) : null }
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="apellido" className="inline-block mb-2 text-base font-medium">
                                        Apellido
                                    </label>
                                    <input 
                                        type="text" 
                                        id="apellido" 
                                        name="apellido" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Apellido" 
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                    />
                                
                                    { formik.touched.apellido && formik.errors.apellido ? (
                                        <p className="text-red-400">{ formik.errors.apellido }</p>
                                    ) : null }
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="genero" className="inline-block mb-2 text-base font-medium">
                                        Genero
                                    </label>
                                    <select 
                                        name="genero" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                        value={formik.values.genero}
                                        onChange={formik.handleChange}
                                    >
                                        {
                                            GeneroOptions.map((genero, index) => (
                                                <option key={index} value={genero.value}>{genero.label}</option>
                                            ))
                                        }
                                    </select>

                                    { formik.touched.genero && formik.errors.genero ? (
                                        <p className="text-red-400">{ formik.errors.genero }</p>
                                    ) : null }
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="email" className="inline-block mb-2 text-base font-medium">
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Email" 
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                
                                    { formik.touched.email && formik.errors.email ? (
                                        <p className="text-red-400">{ formik.errors.email }</p>
                                    ) : null }
                                </div>

                                <div className="xl:col-span-6">
                                    <label htmlFor="telefono" className="inline-block mb-2 text-base font-medium">
                                        Telefono
                                    </label>
                                    <input 
                                        type="text" 
                                        id="numero_celular" 
                                        name="numero_celular" 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                        placeholder="Telefono"
                                        value={formik.values.numero_celular}
                                        onChange={formik.handleChange} 
                                    />
                                    
                                    { formik.touched.numero_celular && formik.errors.numero_celular ? (
                                        <p className="text-red-400">{ formik.errors.numero_celular }</p>
                                    ) : null }
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
                        </form>
                    {/* </Formik> */}
                </div>

                {/* Imagenes de usuario  */}
                <div className="card p-5">
                    <h6 className="mb-1 text-15">Acciones y Documentación</h6>
                    <div className="flex flex-col xl:flex-row justify-between my-4 gap-x-4">
                        <ImageViewer
                            key='Frente-Documento'
                            // src="https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            src={activeUser.documento_frontal}
                            alt="snow"
                            caption="Frente de Documento"
                        />

                        <ImageViewer
                            key="Dorso-Documento"
                            // src="https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            src={activeUser.documento_dorsal}
                            alt="snow"
                            caption="Dorso de Documento"
                        />

                        <ImageViewer
                            key="Foto-Rostro"
                            // src="https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            src={activeUser.foto}
                            alt="snow"
                            caption="Foto de Rostro"
                        />
                    </div>
                    <div className="grid items-end grid-cols-1 gap-5 xl:grid-cols-2 mt-5">
                        <div>
                            <label htmlFor="Documentación de Menor" className="inline-block mb-2 text-base font-medium">
                                Documentación de Menor
                            </label>
                            <input type="file" className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500" />
                        </div>
                        <div>
                            <button type="button" onClick={toggle} className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20">Editar Documentación</button>
                        </div>
                    </div>
                    <div className="grid items-center grid-cols-1 gap-5 mt-5">
                        <div>
                            <label htmlFor="comentario" className="inline-block mb-2 text-base font-medium">Comentario</label>
                            <textarea 
                                id="comentario" 
                                name="comentario"
                                className="px-3 form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                rows={4}
                                placeholder="Agregar un comentario"
                                // onChange={(e) => handleChangeDoc("comentario", e.target.value)}
                                value={formik.values.comentario}
                                onChange={formik.handleChange} 
                                >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid items-end grid-cols-1 gap-5">
                                <div>
                                    <label htmlFor="documento_frontal" className="inline-block mb-2 text-base font-medium">
                                        Frente de Documento
                                    </label>
                                    <input 
                                        id="documento_frontal"
                                        type="file" 
                                        name="documento_frontal" 
                                        className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500" 
                                        onChange={(e) => handleChangeDoc(e)}
                                    />
                                </div>
                            </div>

                            <div className="grid items-end grid-cols-1 gap-5 mt-4">
                                <div>
                                    <label htmlFor="documento_dorsal" className="inline-block mb-2 text-base font-medium">
                                        Dorso de Documento
                                    </label>
                                    <input 
                                        id="documento_dorsal"
                                        type="file" 
                                        name="documento_dorsal" 
                                        className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500" 
                                    />
                                </div>
                            </div>

                            <div className="grid items-end grid-cols-1 gap-5 mt-4">
                                <div>
                                    <label htmlFor="foto" className="inline-block mb-2 text-base font-medium">
                                        Foto de Rostro
                                    </label>
                                    <input 
                                        id="foto"
                                        type="file" 
                                        name="foto" 
                                        className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500" 
                                    />
                                </div>
                            </div>

                            <div className="grid items-end grid-cols-1 gap-5 mt-4">
                                <div>
                                    <label htmlFor="documentacion_menor" className="inline-block mb-2 text-base font-medium">
                                        Documentación de Menor
                                    </label>
                                    <input 
                                        id="documentacion_menor"
                                        type="file" 
                                        name="documentacion_menor" 
                                        className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end gap-2 mt-5">
                            <button type="button" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10" onClick={toggle}>Cancelar</button>
                            <button type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Guardar
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment >
    );
}

export default PersonalInfo;