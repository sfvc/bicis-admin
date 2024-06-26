import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { hubMarker, initialPosition } from "Common/Components/Map";
import MapComponent from "../../Map/MapComponent";
import { useEffect, useState } from "react";
import { generateTrayectory } from "helpers/generateTrayectory";

interface Trayectory {
    start: [number, number], 
    end: [number, number], 
    trayectory: [number, number][]
}

const DetailMap = () => {
    const [points, setPoints] = useState<Trayectory | null >(null)

    useEffect(() => {
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
                    (points) && (
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
                    )
                }

            </MapContainer>
        </MapComponent>
    )
}

export default DetailMap;
