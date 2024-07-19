import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sanction {
    id: number,
    fecha_vencimiento: string,
    tipo_penalidad: object,
    dias_sancion : number,
    dias_bloqueo: number,
    comentario: number,
    created_at: string,
    updated_at: string
}

interface SantionState {
    sanctions: Sanction[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null
    activeSanction: Sanction | null;
}


const initialState: SantionState  = {
    sanctions: [],
    paginate: null,
    activeSanction: null
}

const sanctionSlice = createSlice({
    name: "sanctions",
    initialState,
    reducers: {
        handleSanctions(state: SantionState, action: PayloadAction<any>) {
            const { items, ...pagination } = action.payload
            state.sanctions = items
            state.paginate = { ...pagination }
            state.activeSanction = null
        },
        addNewSanction(state: SantionState, action: PayloadAction<Sanction>) {
            state.sanctions = [...state.sanctions, action.payload]
        },
        setActiveSanction(state: SantionState, action: PayloadAction<number>) {
            state.activeSanction = state.sanctions.find((sanction) => sanction.id === action.payload) || null
        }
    },
});

export const { 
    handleSanctions, 
    addNewSanction,
    setActiveSanction 
} = sanctionSlice.actions;

export default sanctionSlice.reducer;
