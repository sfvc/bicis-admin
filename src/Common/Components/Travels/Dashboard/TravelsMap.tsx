import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { bikeMarker, initialPosition } from "Common/Components/Map";
import MapComponent from "../../Map/MapComponent";
import { useEffect, useState } from "react";
import simulateTravel from "helpers/simulateTravels";
import useSocket from "Hooks/useSocket";

const TravelsMap = () => {
    /* const [travels, setTravels] = useState<any>([])
    const [index, setIndex] = useState<number>(0) */

    const { initiateSocket, subscribeToChat } = useSocket('front/031054167945')
    const [data, setData] = useState(null);

    /* function handleTravels () {
        setTimeout(() => {
            const data = simulateTravel(index)
            setTravels(data)
            if(data) setIndex(index + 1)
        }, 4000)
    } */

    /* useEffect(() => {
        handleTravels()
    }, [index]) */

    useEffect(()=>{
        initiateSocket('messageToServer')
        subscribeToChat((error, msg)=>{
            setData(msg);
        })
    },[])
    
    return (
        <MapComponent >
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* {
                    (travels.length > 0) && travels.map(( travel: any ) => (
                        <Marker key={travel.id} position={travel.coords.point} icon={bikeMarker}>
                            <Popup>
                                <div className="text-center">
                                    <span className="font-semibold">Usuario: </span>{travel.usuario.nombre} {travel.usuario.apellido} <br /> 
                                    <span className="font-semibold">Unidad: </span>{travel.unidad} <br /> 
                                    <span className="font-semibold">Tipo: </span>{travel.tipo_unidad} <br /> 
                                    <span className="font-semibold">Ultima posición <br /></span>{travel.coords.date} <br /> 
                                </div>
                            </Popup>
                        </Marker>
                    ))
                } */}
            </MapContainer>

            <div className="mt-4 px-4">
                <p>Received Data: {JSON.stringify(data)}</p>
            </div>
        </MapComponent>
    )
}

export default TravelsMap;
