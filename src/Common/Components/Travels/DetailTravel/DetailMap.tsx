import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useSocket from "Hooks/useSocket";
import MapComponent from "../../Map/MapComponent";
import { bikeMarker, initialPosition } from "Common/Components/Map";
import { LatLngExpression } from "leaflet";

const DetailMap = () => {
    const { activeTravel } =  useSelector((state: any) => state.Travel)
    const { initiateSocket, subscribeToChat } = useSocket()
    const [position, setPosition] = useState<LatLngExpression>(initialPosition);

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

    return (
        <MapComponent >
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    position !== initialPosition && (
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
                    )
                }
            </MapContainer>
        </MapComponent>
    )
}

export default DetailMap;
