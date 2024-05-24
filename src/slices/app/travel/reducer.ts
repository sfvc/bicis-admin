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

interface TravelState {
    travels: Travel[];
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeTravel: any;
}

const initialState:TravelState = {
    travels: [],
    paginate: null,
    activeTravel: null
}

const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        handleTravels(state: TravelState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.travels = items
            state.paginate = { ...paginate }
            state.activeTravel = null
        },
        setActiveTravel(state: TravelState, action: PayloadAction<number>) {
            state.activeTravel = state.travels.find((travel) => travel.id === action.payload) || null
        }
    },
});

export const { 
    handleTravels, 
    setActiveTravel 
} = travelSlice.actions;

export default travelSlice.reducer;
