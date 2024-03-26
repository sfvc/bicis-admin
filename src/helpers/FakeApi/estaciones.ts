import { LatLngExpression } from "leaflet";

interface Estacion {
    id: number;
    nombre: string;
    direccion: string;
    ubicacion: LatLngExpression;
    capacidadBicicletasElectricas: number;
    capacidadBicicletasMecanicas: number;
}

const estaciones: Estacion[] = [
    {
        id: 1,
        nombre: "Nodo",
        direccion: "Capital Federal 172",
        ubicacion: [-28.4767525, -65.7874828],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 2,
        nombre: "Punto Giro (Valle Chico)",
        direccion: "Av. 2",
        ubicacion: [-28.4970273, -65.8168699],
        capacidadBicicletasElectricas: 0,
        capacidadBicicletasMecanicas: 8
    },
    {
        id: 3,
        nombre: "ISAC",
        direccion: "San Martín 1164",
        ubicacion: [-28.4685975, -65.7708084],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 4,
        nombre: "IFD",
        direccion: "Pje. Maipú 2550",
        ubicacion: [-28.4937961, -65.7833644],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 5,
        nombre: "Plaza de Choya",
        direccion: "Av. Virgen del Valle Nte. 963",
        ubicacion: [-28.4502287, -65.7889434],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 6,
        nombre: "Plaza 25 de Agosto",
        direccion: "1 de Mayo 1222",
        ubicacion: [-28.4765769, -65.7775816],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 7,
        nombre: "Parque de los Niños (CAPE)",
        direccion: "Av. República de Venezuela",
        ubicacion: [-28.461272, -65.767802],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 8,
        nombre: "Plaza Virgen del Valle (UNCA)",
        direccion: "Ayacucho 10",
        ubicacion: [-28.4609383, -65.7839263],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    },
    {
        id: 9,
        nombre: "Plaza 25 de Mayo (Catedral)",
        direccion: "Sarmiento 635-667",
        ubicacion: [-28.4688493, -65.7796562],
        capacidadBicicletasElectricas: 5,
        capacidadBicicletasMecanicas: 10
    }  
];

export default estaciones;