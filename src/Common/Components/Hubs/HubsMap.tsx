import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { initialPosition, hubMarker } from "Common/Components/Map";
import MapComponent from '../Map/MapComponent';
import { useEffect } from "react";
import { startLoadingHubs } from "slices/app/catalog/hubs/thunks";
import { useDispatch, useSelector } from "react-redux";

const HubsMap = () => {
    const dispatch = useDispatch<any>()
    const { hubs } = useSelector((state: any) => state.HubCatalog)

    useEffect(() => {
        dispatch( startLoadingHubs() )
    }, [])
    
    return (
        <MapComponent>
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    hubs.length > 0 && hubs.map((hub: any) => (
                        <Marker position={hub.ubicacion} icon={hubMarker}>
                            <Popup>
                                {hub.nombre} <br /> {hub.direccion}
                            </Popup>
                        </Marker>
                    ))
                }
                
            </MapContainer>
        </MapComponent>
    )
}

export default HubsMap;
