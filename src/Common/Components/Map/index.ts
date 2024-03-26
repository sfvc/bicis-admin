import L from 'leaflet'
import { LatLngExpression } from "leaflet";
import markerIcon from 'assets/leaflet/images/marker-icon.png';
import customMarker from 'assets/leaflet/images/custom-marker.png';

export const initialPosition: LatLngExpression = [-28.4696, -65.7856]; 

export const markerDefault = new L.Icon({
    iconUrl: markerIcon,
});

export const iconMarker = new L.Icon({
    iconUrl: customMarker,
    iconSize: [32, 32], // ajusta el tamaño de acuerdo a la imagen
    iconAnchor: [16, 32], // ajusta la posición del anclaje
    popupAnchor: [0, -32], // ajusta la posición del popup
});


