import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Unit {
    id: number,
    patente: string,
    tipo: string,
    estado : string,
    created_at: string,
    updated_at: string
}

interface UnitState {
    units: Unit[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeUnit: Unit | null
}


const initialState: UnitState  = {
    units: [],
    paginate: null,
    activeUnit: null
}

const unitCatalogSlice = createSlice({
    name: "unitsCatalog",
    initialState,
    reducers: {
        handleUnits(state: UnitState, action: PayloadAction<any>) {
            const { items, ...pagination } = action.payload
            state.units = items
            state.paginate = { ...pagination }
            state.activeUnit = null
        },
        handleSearchUnit(state: UnitState, action: PayloadAction<any>) {
            state.units = action.payload
        },
        addNewUnit(state: UnitState, action: PayloadAction<Unit>) {
            state.units = [...state.units, action.payload]
        },
        setActiveUnit(state: UnitState, action: PayloadAction<number>) {
            state.activeUnit = state.units.find((unit) => unit.id === action.payload) || null
        },
        resetActiveUnit(state: UnitState) {
            state.activeUnit = null
        }
    },
});

export const { 
    handleUnits, 
    handleSearchUnit,
    addNewUnit,
    setActiveUnit,
    resetActiveUnit
} = unitCatalogSlice.actions;

export default unitCatalogSlice.reducer;
