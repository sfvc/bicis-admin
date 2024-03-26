import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression, Marker as TypeMarker } from 'leaflet';
import { initialPosition, markerDefault } from 'Common/Components/Map';
import { startSavingHub, startUpdateHub } from 'slices/app/catalog/hubs/thunks';
import { useNavigate } from 'react-router-dom';

interface FormData {
    nombre: string,
    direccion: string,
    capacidadElectrica: number | null,
    capacidadMecanica: number | null
}

const initialValues: FormData = {
    nombre: '',
    direccion: '',
    capacidadElectrica: null,
    capacidadMecanica: null
};

const NewHub = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const { activeHub } = useSelector(( state: any ) => state.HubCatalog)
    const [position, setPosition] = useState<LatLngExpression>(activeHub?.ubicacion || initialPosition)

    function DraggableMarker () {
        const [draggable, setDraggable] = useState<boolean>(false)
        const markerRef = useRef<TypeMarker | null>(null)
    
        const eventHandlers = useMemo(
          () => ({
            dragend() {
              const marker = markerRef.current;

              if (marker != null) {
                setPosition(marker.getLatLng())
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

    function handleSubmit (values: FormData) {
        if(activeHub) {
            dispatch( startUpdateHub({...values, ubicacion: position}, activeHub.id) )
        } else {
            dispatch( startSavingHub({...values, ubicacion: position}) )
        }

        navigate('/catalogo/estaciones')
    };

    return (
        <React.Fragment>
            <div className="card p-5 mt-5">
                <h6 className="mb-1 text-15">Agregar Estación</h6>

                {/* Mapa */}
                <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem] mb-5">
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
                                <Field type="text" id="nombre" name="nombre" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Nombre de Estación"/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="direccion" className="inline-block mb-2 text-base font-medium">
                                    Dirección
                                </label>
                                <Field type="text" id="direccion" name="direccion" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Dirección"/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="capacidadMecanica" className="inline-block mb-2 text-base font-medium">
                                    Capacidad de Bicis Mecanicas
                                </label>
                                <Field type="number" id="capacidadMecanica" name="capacidadMecanica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Electricas"/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="capacidadElectrica" className="inline-block mb-2 text-base font-medium">
                                    Capacidad de Bicis Electricas
                                </label>
                                <Field type="number" id="capacidadElectrica" name="capacidadElectrica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Mecanicas"/>
                            </div>
     
                        </div>

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
    )
}

export default NewHub;