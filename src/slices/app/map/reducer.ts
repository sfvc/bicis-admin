import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Travel {
    id: number,
    fecha_inicio: string,
    fecha_finalizacion: string,  
    estado: string,
    bicicleta: any,
    duracion: string,
    estacion_inicio: any,
    estacion_final: any,
    usuario: any,
}

interface MapState {
    travelsMap: Travel[];
    activeTravelMap: any;
}

const initialState: MapState = {
    travelsMap: [],
    activeTravelMap: null
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        handleTravelsMap(state: MapState, action: PayloadAction<any>) {
            state.travelsMap = action.payload
            state.activeTravelMap = null
        },
        setActiveTravelMap(state: MapState, action: PayloadAction<number>) {
            state.activeTravelMap = state.travelsMap.find((travel) => travel.id === action.payload) || null
        }
    },
});

export const { 
    handleTravelsMap, 
    setActiveTravelMap
} = mapSlice.actions;

export default mapSlice.reducer;
