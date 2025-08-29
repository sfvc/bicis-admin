/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { bikeMarker, initialPosition } from "Common/Components/Map";
import MapComponent from "../../Map/MapComponent";
import { useEffect, useState } from "react";
import useSocket from "Hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingTravelsMap } from "slices/app/map/thunks";

const url = process.env.REACT_APP_SOCKET_TRACKER || '';

interface Point {
    id: string,
    latitude: number,
    longitude: number
}

/* const test: Point[] = [
    {
        longitude: -65.7796562,
        latitude: -28.4688493,
        id: "031054168125"
    },
    {
        longitude: -65.77897120903226,
        latitude: -28.46882980580645,
        id: "031054203526"
    },
    {
        longitude: -65.77828621806452,
        latitude: -28.468810311612902,
        id: "031054168125"
    },
    {
        longitude: -65.77760122709678,
        latitude: -28.468790817419354,
        id: "031054203526"
    },
] */

const TravelsMap = () => {
    const { initiateSocket, subscribeToChat } = useSocket(url, 'front/global');
    const [bikes, setBikes] = useState<any[]>([]);
    const dispatch = useDispatch<any>();
    const { travelsMap: travels } = useSelector((state: any) => state.Map);

    const receivedData = (point: Point) => {
        console.log("Point received from socket:", point);
        console.log("Current travels:", travels);
    
        setBikes((prevBikes) => {
            const updatedBikes = prevBikes.map((bike) => {
                if (bike.bicicleta.tracker.traccar_id === String(point.id)) {
                    return {
                        ...bike,
                        bicicleta: {
                            ...bike.bicicleta,
                            lat: point.latitude,
                            long: point.longitude,
                        },
                    };
                }
                return bike;
            });
    
            const isExistingBike = updatedBikes.some(
                (bike) => bike.bicicleta.tracker.traccar_id === String(point.id)
            );
    
            if (!isExistingBike) {
                const matchingTravel = travels.find(
                    (travel: any) => travel.bicicleta.tracker.traccar_id === String(point.id)
                );
                if (matchingTravel) {
                    return [
                        ...updatedBikes,
                        {
                            ...matchingTravel,
                            bicicleta: {
                                ...matchingTravel.bicicleta,
                                lat: point.latitude,
                                long: point.longitude,
                            },
                        },
                    ];
                }
            }
    
            return updatedBikes;
        });
    };

    useEffect(() => {
        dispatch( startLoadingTravelsMap() );
    }, [])

    useEffect(() => {
        if (travels.length > 0) {
            initiateSocket('messageToServer');
            subscribeToChat((error, msg) => receivedData(msg));
        }
    }, [travels]);

    return (
        <MapComponent >
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 

                {
                    (bikes.length > 0) && bikes.map(( bike: any ) => (
                        <Marker key={bike.id} position={[bike.bicicleta.lat, bike.bicicleta.long]} icon={bikeMarker}>
                            <Popup>
                                <div className="text-center">
                                    <span className="font-semibold">Bicicleta: </span>{bike.id}<br /> 
                                    <span className="font-semibold">Usuario: </span>{bike.usuario.nombre} {bike.usuario.apellido}<br />
                                    <span className="font-semibold">Unidad: </span>{bike.bicicleta.patente} <br /> 
                                    <span className="font-semibold">Tipo: </span>{bike.bicicleta.tipo_unidad || 'TIPO UNIDAD'} <br /> 
                                    <span className="font-semibold">Ultima posición: <br /></span>[{bike.bicicleta.lat} {bike.bicicleta.long}]<br />  
                                </div>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </MapComponent>
    )
}

export default TravelsMap;
