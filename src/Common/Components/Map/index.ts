import L from 'leaflet'
import { LatLngExpression } from "leaflet";
import markerIcon from 'assets/leaflet/images/marker-icon.png';
import customMarker from 'assets/leaflet/images/custom-marker.png'; // TODO: Eliminar al finalizar
import hub from 'assets/leaflet/images/hub-marker.png';
import bike from 'assets/leaflet/images/bike-marker.png';

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

export const hubMarker = new L.Icon({
    iconUrl: hub,
    iconSize: [36, 36], // ajusta el tamaño de acuerdo a la imagen
    iconAnchor: [16, 32], // ajusta la posición del anclaje
    popupAnchor: [0, -32], // ajusta la posición del popup
});

export const bikeMarker = new L.Icon({
    iconUrl: bike,
    iconSize: [26, 26], // ajusta el tamaño de acuerdo a la imagen
    iconAnchor: [0, 0], // ajusta la posición del anclaje
    popupAnchor: [0, -32], // ajusta la posición del popup
});
