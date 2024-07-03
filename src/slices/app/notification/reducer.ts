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

interface NotificationState {
    notifications: Travel[];
}

const initialState: NotificationState = {
    notifications: [],
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        handleNotifications(state: NotificationState, action: PayloadAction<any>) {
            state.notifications = action.payload
        }
    },
});

export const { 
    handleNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;
