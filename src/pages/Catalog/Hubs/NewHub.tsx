import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, Polygon  } from 'react-leaflet';
import { LatLngExpression, LatLng , Marker as TypeMarker } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Field, Formik, Form } from 'formik';
import { Pen } from 'lucide-react';
import { startSavingHub, startUpdateHub } from 'slices/app/catalog/hubs/thunks';
import { initialPosition, markerDefault } from 'Common/Components/Map';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Tooltip } from 'react-tooltip';

interface FormData {
    nombre: string,
    direccion: string,
    capacidad_electrica: number | null,
    capacidad_mecanica: number | null
}

const initialValues: FormData = {
    nombre: '',
    direccion: '',
    capacidad_electrica: null,
    capacidad_mecanica: null
};

const initialPolygon = [
    {
        lat: -28.472444960005284,
        lng: -65.78540325164796
    },
    {
        lat: -28.473425794601898,
        lng: -65.78274250030519
    },
    {
        lat: -28.47059643928235,
        lng: -65.78098297119142
    },
    {
        lat: -28.467691555660018,
        lng: -65.78278541564943
    },
    {
        lat: -28.467729281933185,
        lng: -65.78750610351564
    },
    {
        lat: -28.470860515651488,
        lng: -65.78845024108888
    }
]

const NewHub = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const { activeHub } = useSelector(( state: any ) => state.HubCatalog)
    const [position, setPosition] = useState<LatLngExpression>(activeHub?.ubicacion || initialPosition)
    const [polygon, setPolygon] = useState<LatLngExpression[]>(activeHub?.perimetro || [])
    const featureGroupRef = useRef<any>(null); // Ref para acceder al grupo de características del polígono

    const onCreated = (e: any) => {
		let layer = e.layer;
		// console.log("Geojson", layer.toGeoJSON());
        setPolygon(layer.getLatLngs()[0]) // Retorna un array de poligonos. Solo tomo el primero
	};

    const handleEdit = () => {
        setPolygon([])
    }

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
        if (position instanceof LatLng) {
            const {lat, lng} = position

            const data = {
                ...values, 
                ubicacion: { lat, lng }, 
                perimetro: polygon
            }

            if(activeHub) {
                dispatch( startUpdateHub(data, activeHub.id) )
            } else {
                dispatch( startSavingHub(data) )
            }
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

                    {/* Grupo de características del polígono */}
                    <FeatureGroup ref={featureGroupRef}>
                        {/* Control de edición del polígono */}
                        <EditControl
                            position="topright"
                            onCreated={onCreated}
                            draw={{
                                rectangle: false, // Deshabilitar dibujar rectángulos
                                circle: false, // Deshabilitar dibujar círculos
                                marker: false, // Deshabilitar dibujar marcadores
                                circlemarker: false,
                                polyline: false
                            }}
                        />
                    </FeatureGroup>

                    <Polygon pathOptions={{ fillColor: 'blue' }} positions={polygon} />
                    
                    <div className='relative'>
                        <button
                            type="button" 
                            onClick={handleEdit}
                            style={{ zIndex: 9999 }}
                            className="py-1.5 px-1 border-2 shadow-sm rounded-md absolute top-2.5 right-14 flex items-center text-white bg-custom-500 hover:bg-custom-600"
                            data-tooltip-id="default" 
                            data-tooltip-content="Editar"
                        >
                            <Tooltip id="default" place="top" content="Editar" />
                            <Pen className='h-5'></Pen>
                        </button>
                    </div>

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
                                <Field type="number" id="capacidad_mecanica" name="capacidad_mecanica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Electricas"/>
                            </div>

                            <div className="xl:col-span-6">
                                <label htmlFor="capacidad_electrica" className="inline-block mb-2 text-base font-medium">
                                    Capacidad de Bicis Electricas
                                </label>
                                <Field type="number" id="capacidad_electrica" name="capacidad_electrica" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Capacidad Mecanicas"/>
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
    );
};

export default NewHub;
