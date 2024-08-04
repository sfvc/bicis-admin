import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Marker as TypeMarker } from 'leaflet';
import { Field, Formik, Form } from 'formik';
import { startSavingHub, startUpdateHub } from 'slices/app/catalog/hubs/thunks';
import { initialPosition, markerDefault } from 'Common/Components/Map';
import ErrorAlert from 'Common/Components/Ui/Alert/ErrorAlert';
import 'leaflet-draw/dist/leaflet.draw.css';

interface FormData {
    nombre: string,
    direccion: string,
    capacidad_electrica: number,
    capacidad_mecanica: number,
    cantidad_electrica: number,
    cantidad_mecanica: number
}

const initialValues: FormData = {
    nombre: '',
    direccion: '',
    capacidad_electrica: 0,
    capacidad_mecanica: 0,
    cantidad_electrica: 0,
    cantidad_mecanica: 0,
};

const NewHub = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const { activeHub } = useSelector(( state: any ) => state.HubCatalog)
    const [position, setPosition] = useState<any>(() => {
        if(activeHub) return [activeHub.ubicacion.lat, activeHub.ubicacion.lng];
        return initialPosition;
    })
    const [errorMessage, setErrorMessage] = useState<string>('')

    function DraggableMarker () {
        const [draggable, setDraggable] = useState<boolean>(false)
        const markerRef = useRef<TypeMarker | null>(null)
    
        const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current;

              if (marker != null) {
                const { lat, lng } = marker.getLatLng()
                setPosition([lat, lng])
              }
            },
          }),
          [],
        )
        const toggleDraggable = useCallback(() => {
          setDraggable((d) => !d)
        }, [])
      
        return (
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerDefault}
            >
    
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? 'El marcador se puede arrastrar'
                  : 'Haga click aqui para arrastrar el marcador'}
              </span>
            </Popup>
    
          </Marker>
        )
    }

    async function handleSubmit (values: FormData) {
        let response;

        if (position !== initialPosition) {
            const [ lat, lng ] = position

            const data = {
                ...values, 
                ubicacion: { lat, lng },
            }

            if(activeHub) {
                response = await dispatch( startUpdateHub(data, activeHub.id) )
            } else {
                response = await dispatch( startSavingHub(data) )
            }

            if(response !== true) setErrorMessage(response);
        } else {
            setErrorMessage('Debe seleccionar la ubicación de la estación.')
        }

        if(response === true) navigate('/catalogo/estaciones')
    };

    return (
        <React.Fragment>
            <div className="card p-5 mt-5">
                <h6 className="mb-1 text-15">{activeHub ? "Editar Estación" : "Agregar Estación"}</h6>

                {/* Mapa */}
                <MapContainer center={initialPosition} zoom={14} scrollWheelZoom={true} className="h-[30rem] mb-5">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker />
                </MapContainer>

                {/* Formulario */}
                <Formik initialValues={activeHub || initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            <div className="xl:col-span-6">
                                <label htmlFor="nombre" className="inline-block mb-2 text-base font-medium">
                                    Nombre
                                </label>
                                <Field type="text" id="nombre" name="nombre" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Nombre de Estación" required/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="direccion" className="inline-block mb-2 text-base font-medium">
                                    Dirección
                                </label>
                                <Field type="text" id="direccion" name="direccion" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Dirección" required/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="capacidadMecanica" className="inline-block mb-2 text-base font-medium">
                                    Capacidad de Bicis Mecanicas
                                </label>
                                <Field type="number" id="capacidad_mecanica" name="capacidad_mecanica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Electricas" min={0}/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="capacidad_electrica" className="inline-block mb-2 text-base font-medium">
                                    Capacidad de Bicis Electricas
                                </label>
                                <Field type="number" id="capacidad_electrica" name="capacidad_electrica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Mecanicas" min={0}/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="cantidad_electrica" className="inline-block mb-2 text-base font-medium">
                                    Cantidad de Bicis Mecanicas
                                </label>
                                <Field type="number" id="cantidad_mecanica" name="cantidad_mecanica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Cantidad Mecanicas" min={0}/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="cantidad_electrica" className="inline-block mb-2 text-base font-medium">
                                Cantidad de Bicis Electricas
                                </label>
                                <Field type="number" id="cantidad_electrica" name="cantidad_electrica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Cantidad Electricas" min={0}/>
                            </div>
                        </div>

                        {
                            errorMessage && <ErrorAlert message={errorMessage}/>
                        }

                        <div className="flex justify-end mt-6 gap-x-4">
                            <button type="button" onClick={() => navigate('/catalogo/estaciones')} className="text-red-500 bg-red-100 btn hover:text-white hover:bg-red-600 focus:text-white focus:bg-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:ring active:ring-red-100 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:bg-red-500 dark:focus:text-white dark:active:bg-red-500 dark:active:text-white dark:ring-red-400/20">
                                Cancelar
                            </button>

                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Guardar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </React.Fragment>
    );
};

export default NewHub;
