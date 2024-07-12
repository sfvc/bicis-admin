import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum TipoPenalidadEnum {
    GRAVE = 'GRAVE',
    MODERADO = 'MODERADO',
    LEVE = 'LEVE',
    APLICADA = 'APLICADA',
}

interface Penalty {
    id: number,
    nombre: string,
    tipo_penalidad: TipoPenalidadEnum,
    dias : number,
    descripcion: string,
    deleted: boolean,
    updated_at: string,
    created_at: string,
}

interface PenaltyState {
    penalties: Penalty[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activePenalty: Penalty | null
}


const initialState: PenaltyState  = {
    penalties: [],
    paginate: null,
    activePenalty: null
}

const penaltyCatalogSlice = createSlice({
    name: "penaltyCatalog",
    initialState,
    reducers: {
        handlePenalties(state: PenaltyState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.penalties = items
            state.paginate = { ...paginate }
            state.activePenalty = null
        },
        handleSearchPenalty(state: PenaltyState, action: PayloadAction<any>) {
            state.penalties = action.payload
        },
        addNewPenalty(state: PenaltyState, action: PayloadAction<Penalty>) {
            state.penalties = [...state.penalties, action.payload]
        },
        setActivePenalty(state: PenaltyState, action: PayloadAction<number>) {
            state.activePenalty = state.penalties.find((penalty) => penalty.id === action.payload) || null
        }
    },
});

export const { 
    handlePenalties, 
    handleSearchPenalty,
    addNewPenalty,
    setActivePenalty 
} = penaltyCatalogSlice.actions;

export default penaltyCatalogSlice.reducer;
