import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import useSocket from "Hooks/useSocket";
import MapComponent from "../../Map/MapComponent";
import { bikeMarker, hubMarker, initialPosition } from "Common/Components/Map";
import { LatLngExpression } from "leaflet";
import { generateTrayectory } from "helpers/generateTrayectory";

interface Trayectory {
    start: [number, number], 
    end: [number, number], 
    trayectory: [number, number][]
}

const DetailMap = () => {
    const { activeTravel } =  useSelector((state: any) => state.Travel)
    const { initiateSocket, subscribeToChat } = useSocket()
    const [position, setPosition] = useState<LatLngExpression>(initialPosition);

    const [points, setPoints] = useState<Trayectory | null >(null)

    const formatPoint = (data: any) => {
        // TODO: Corroborar que el id del tracker corresponda con el de la bici en viaje 
        // if(data.id === activeTravel.bicicleta.id) return false 
        const point: LatLngExpression = [ data.latitude, data.longitude ]
        setPosition(point);
    }

    useEffect(()=>{
        initiateSocket('messageToServer')
        subscribeToChat((error, msg) => formatPoint(msg))
    },[])

    useEffect(() => {
        // TODO: Cambiar por el endpoint real con la trayectoria del viaje para dibujar
        // Simula una trayectoria real de un hub a otro
        const data = generateTrayectory()
        setPoints(data)
    }, [])

    return (
        <MapComponent >
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    (activeTravel.estado === 'FINALIZADO')
                    ? (
                        <>
                            {(points) && (
                                <>
                                    {/* Estacion incial */}
                                    <Marker position={points.start} icon={hubMarker}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
        
                                    {/* Estacion final */}
                                    <Marker position={points.end} icon={hubMarker}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
        
                                    {/* Trayectoria */}
                                    <Polyline positions={points.trayectory} color="purple" />
                                </>
                            )}
                        </>
                    )
                    : (
                        <>
                            {(position !== initialPosition) && (
                                <Marker key={activeTravel.id} position={position} icon={bikeMarker}>
                                    <Popup>
                                        <div className="text-center">
                                            <span className="font-semibold">Usuario: </span>{activeTravel.usuario.nombre} {activeTravel.usuario.apellido} <br /> 
                                            <span className="font-semibold">Unidad: </span>{activeTravel.bicicleta.patente} <br /> 
                                            <span className="font-semibold">Tipo: </span>{activeTravel.bicicleta.tipo_de_unidad} <br /> 
                                            {/* <span className="font-semibold">Ultima posición <br /></span>{activeTravel.coords.date} <br />  */}
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                        </>
                    )
                }
            </MapContainer>
        </MapComponent>
    )
}

export default DetailMap;
