import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number,
    username: string,
    nombre:string,
    apellido: string,
    rol: string,
    activo: boolean,
    estacion_id: number,
    created_at: string,
    updated_at: string
}

interface LoginState {
    user: User | null,
    status: string
    error: string;
}

const initialState: LoginState = {
    user: null,
    status: "checking", // 'checking', 'not-authenticated', 'autenthicated'
    error: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginSuccess(state: LoginState, action: PayloadAction<any>) {
            state.user = action.payload;
            state.status = 'autenthicated';
        },
        loginError(state: LoginState, action: PayloadAction<string | any>) {
            state.error = action.payload;
            state.status = 'not-authenticated';
        },
        logoutSuccess(state: LoginState) {
            state.user = null;
            state.status = 'not-authenticated';
        },
        checkingCredentials: (state: LoginState) => {
            state.status = 'checking';
        }
    },
});

export const { loginSuccess, loginError, logoutSuccess, checkingCredentials } = loginSlice.actions;
export default loginSlice.reducer;
