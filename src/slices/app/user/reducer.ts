import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
    id: number,
    dni: number,
    nombre: string,
    apellido: string,
    genero: string,
    email : string,
    telefono: string,
    documentos_y_acciones: {
        documento_frontal: string,
        documento_dorso: string,
        foto_de_rostro: string,
    },
    activo: boolean
}

interface UserState {
    users: Usuario[];
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeUser: Usuario | null;
}

const initialState: UserState = {
    users: [],
    paginate: null,
    activeUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleUsers(state: UserState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.users = items
            state.paginate = { ...paginate }
            state.activeUser = null
        },
        handleSearchUser(state: UserState, action: PayloadAction<any>) {
            state.users = action.payload
        },
        setActiveUser(state: UserState, action: PayloadAction<number>) {
            state.activeUser = state.users.find((user) => user.id === action.payload) || null
        },
        setStatusUser(state: UserState) {
            if (!state.activeUser) return;

            state.activeUser.activo = !state.activeUser.activo

            state.users.map((user) => {
                if (user.id === state.activeUser?.id) return state.activeUser;
                return user;
            }) 
        }
    },
});

export const { 
    handleUsers, 
    handleSearchUser,
    setActiveUser,
    setStatusUser 
} = userSlice.actions;

export default userSlice.reducer;
