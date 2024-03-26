import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
    id: number,
    nombre: string,
    apellido: string,
    email : string,
    password: string,
    genero: string,
    rol: string,
    updated_at: string,
    created_at: string,
    activo: boolean,
    estacion_id: any
}

interface AdminState {
    admins: Admin[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeAdmin: Admin | null
}


const initialState: AdminState  = {
    admins: [],
    paginate: null,
    activeAdmin: null
}

const adminCatalogSlice = createSlice({
    name: "hubsCatalog",
    initialState,
    reducers: {
        handleAdmins(state: AdminState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.admins = items
            state.paginate = { ...paginate }
            state.activeAdmin = null
        },
        handleSearchAdmin(state: AdminState, action: PayloadAction<any>) {
            state.admins = action.payload
        },
        addNewAdmin(state: AdminState, action: PayloadAction<Admin>) {
            state.admins = [...state.admins, action.payload]
        },
        setActiveAdmin(state: AdminState, action: PayloadAction<number>) {
            state.activeAdmin = state.admins.find((admin) => admin.id === action.payload) || null
        }
    },
});

export const { 
    handleAdmins, 
    handleSearchAdmin,
    addNewAdmin,
    setActiveAdmin 
} = adminCatalogSlice.actions;

export default adminCatalogSlice.reducer;
