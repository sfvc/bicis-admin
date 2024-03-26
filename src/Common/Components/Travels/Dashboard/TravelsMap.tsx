import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { initialPosition } from "Common/Components/Map";
import MapComponent from "../../Map/MapComponent";

const TravelsMap = () => {
    return (
        <MapComponent >
            <MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true} className="h-[30rem]">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </MapComponent>
    )
}

export default TravelsMap;
