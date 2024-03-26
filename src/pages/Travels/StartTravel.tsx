import React from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import CustomSelect from "Common/Components/Select/CustomSelect";
import { hubsData } from "Common/data";
import { useNavigate } from "react-router-dom";

interface FormData {
    user_id: number | null,
    hub_origen: string;
    hub_destino: string;
}

const initialValues: FormData = {
    user_id: null,
    hub_origen: '',
    hub_destino: ''
};

const StartTravel = () => {
    const { activeUser } = useSelector( (state: any) => state.User)
    const navigate = useNavigate()

    function handleSubmit (values: FormData) {
        const data = {
            ...values, 
            user_id: activeUser.id
        }
        
        console.log(data);
    };

    return (
        <React.Fragment>
            <div className="card p-5 mt-5">
                <h6 className="mb-1 text-15">Iniciar Viaje</h6>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            <div className="xl:col-span-6">
                                <label htmlFor="dni" className="inline-block mb-2 text-base font-medium">
                                    DNI
                                </label>
                                <Field value={activeUser.dni} type="number" id="dni" name="dni" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" disabled/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="usuario" className="inline-block mb-2 text-base font-medium">
                                    Usuario
                                </label>
                                <Field value={ `${activeUser.nombre} ${activeUser.apellido}` } type="text" id="usuario" name="usuario" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your value" disabled/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="hub_origen" className="inline-block mb-2 text-base font-medium">
                                    Estacion de Origen
                                </label>
                                <Field id="hub_origen" name="hub_origen" as="select" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                    <option value='' hidden>Seleccionar una estación</option>
                                    {
                                        hubsData.map((hub) => (
                                            <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                        ))
                                    }
                                </Field>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="hub_destino" className="inline-block mb-2 text-base font-medium">
                                    Estacion de Destino
                                </label>
                                <Field id="hub_destino" name="hub_destino" as="select" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
                                    <option value='' hidden>Seleccionar una estación</option>
                                    {
                                        hubsData.map((hub) => (
                                            <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                        ))
                                    }
                                </Field>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="patente" className="inline-block mb-2 text-base font-medium">
                                    Bicicleta
                                </label>
                                <Field name="patente" component={CustomSelect} placeholder="Seleccionar una bicicleta" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 gap-x-4">
                            <button type="button" className="text-red-500 bg-red-100 btn hover:text-white hover:bg-red-600 focus:text-white focus:bg-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:ring active:ring-red-100 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:bg-red-500 dark:focus:text-white dark:active:bg-red-500 dark:active:text-white dark:ring-red-400/20">
                                Cancelar
                            </button>

                            <button onClick={() => navigate('/viajes')} type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Iniciar Viaje
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </React.Fragment>
    )
}

export default StartTravel;
