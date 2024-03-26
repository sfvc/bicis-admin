import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Hub {
    id: number,
    nombre: string,
    ubicacion: object,
    direccion : string,
    capacidadElectrica: number,
    capacidadMecanica: number,
    created_at: string,
    updated_at: string
}

interface HubState {
    hubs: Hub[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null
    activeHub: Hub | null;
}


const initialState: HubState  = {
    hubs: [],
    paginate: null,
    activeHub: null
}

const hubCatalogSlice = createSlice({
    name: "hubsCatalog",
    initialState,
    reducers: {
        handleHubs(state: HubState, action: PayloadAction<any>) {
            const { items, ...pagination } = action.payload
            state.hubs = items
            state.paginate = { ...pagination }
            state.activeHub = null
        },
        addNewHub(state: HubState, action: PayloadAction<Hub>) {
            state.hubs = [...state.hubs, action.payload]
        },
        setActiveHub(state: HubState, action: PayloadAction<number>) {
            state.activeHub = state.hubs.find((hub) => hub.id === action.payload) || null
        }
    },
});

export const { 
    handleHubs, 
    addNewHub,
    setActiveHub 
} = hubCatalogSlice.actions;

export default hubCatalogSlice.reducer;
