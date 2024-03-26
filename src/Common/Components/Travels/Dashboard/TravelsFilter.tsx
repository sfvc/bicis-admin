import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAllHubs } from "helpers/api_select";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { startFilterTravels } from "slices/app/travel/thunks";

export const estadosViaje = ['EN_VIAJE', 'FINALIZADO']
export const tiposBicicleta = ['ELECTRICA', 'MECANICA']

interface FormData {
    data: string,
    fecha: string,
    estado: string,
    tipo: string,
    estacion_inicio_id: string,
    estacion_final_id: string
}

const TravelsFilter = () => {
    const dispatch = useDispatch<any>();
    const [hubs, setHubs] = useState<any>([]);

    // Formik
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            data: "",
            fecha: "",
            estado: "",
            tipo: "",
            estacion_inicio_id: "",
            estacion_final_id: ""
        } as FormData,

        onSubmit: (values: any) => {
            console.log(values)
            dispatch( startFilterTravels(values) )
        },
    });

    const handleNumericChange = (fieldName: string, value: string) => {
        formik.setFieldValue(fieldName, parseInt(value));
    };

    const getHubsToSelect = async () => {
        const data = await getAllHubs();
        setHubs(data);
    };

    useEffect(() => {
        getHubsToSelect();
    }, []);

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Buscador de Viajes</h6>
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}>
                        <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3">
                            <div className="mb-4">
                                <label htmlFor="data" className="inline-block mb-2 text-base font-medium">Usuario, Patente o Unidad</label>
                                <input 
                                    type="text" 
                                    id="data" 
                                    name="data"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Buscar por ID, usuario, patente y unidad"
                                    onChange={formik.handleChange}
                                    value={formik.values.data}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="fecha" className="inline-block mb-2 text-base font-medium">Fecha</label>
                                <input 
                                    type="date" 
                                    id="fecha" 
                                    name="fecha"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    onChange={formik.handleChange}
                                    value={formik.values.fecha}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="estado" className="inline-block mb-2 text-base font-medium">Estado del Viaje</label>
                                <select
                                    id="estado"
                                    name="estado"
                                    className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.estado || ""}
                                >
                                    <option value="">Seleccionar estado</option>
                                    {
                                        estadosViaje.map((estado) => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tipo" className="inline-block mb-2 text-base font-medium">Tipo de Unidad</label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.tipo || ""}
                                >
                                    <option value="" disabled>Seleccionar tipo</option>
                                    {
                                        tiposBicicleta.map((tipo) => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))
                                    }
                                </select>
                            </div>  

                            <div className="mb-4">
                                <label htmlFor="estacion_inicio_id" className="inline-block mb-2 text-base font-medium">Estación de origen</label>
                                <select
                                    id="estacion_inicio_id"
                                    name="estacion_inicio_id"
                                    className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={(e) => handleNumericChange("estacion_inicio_id", e.target.value)}
                                    value={formik.values.estacion_inicio_id || ""}
                                >
                                    <option value="" disabled>Seleccionar estación</option>
                                    {
                                        hubs.length > 0 && hubs.map((hub: any) => (
                                            <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div> 

                            
                            <div className="mb-4">
                                <label htmlFor="estacion_final_id" className="inline-block mb-2 text-base font-medium">Estación de destino</label>
                                <select
                                    id="estacion_final_id"
                                    name="estacion_final_id"
                                    className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    onChange={(e) => handleNumericChange("estacion_final_id", e.target.value)}
                                    value={formik.values.estacion_final_id || ""}
                                >
                                    <option value="" disabled>Seleccionar estación</option>
                                    {
                                        hubs.length > 0 && hubs.map((hub: any) => (
                                            <option key={hub.id} value={hub.id}>{hub.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div> 

                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"><X className="inline-block size-4" /> <span className="align-middle">Limpiar</span></button>
                            <button type="submit" className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TravelsFilter;