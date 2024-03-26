import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { initialPosition, iconMarker } from "Common/Components/Map";
import estaciones from 'helpers/FakeApi/estaciones';
import MapComponent from '../Map/MapComponent';


const HubsMap = () => {
    return (
        <MapComponent>
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    estaciones.map((hub) => (
                        <Marker position={hub.ubicacion} icon={iconMarker}>
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
