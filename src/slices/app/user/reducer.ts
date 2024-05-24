import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
    id: number,
    documento_numero: string,
    nombre: string,
    apellido: string,
    genero: string,
    email : string,
    numero_celular: string,
    fecha_nacimiento: string,
    foto: string,
    documento_frontal: string,
    documento_dorsal: string,
    is_active: boolean
    en_viaje: boolean,
    estado_documentacion: string,
    created_at: string,
    updated_at: string,
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

            state.activeUser.is_active = !state.activeUser.is_active

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
