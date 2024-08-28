import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";
import { handleTravels } from "./reducer";
import { handleNotifications } from "../notification/reducer";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingTravels = (query: string = 'activosandpendientes'): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get(`/admin/viaje/${query}`, null)
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateTravels = (query: string = 'activosandpendientes', page: number = 1): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get(`/admin/viaje/${query}`, {page})
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingTravel = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.create('/admin/viaje', data)
        if(response.status === 400) return response.data.message
        dispatch( startLoadingTravels() ) 
        toast.success("Viaje creado con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true;
    } catch (error) {
        console.log(error)
    }
};

export const startApproveTravel = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create(`mobile/viaje/${id}/autorizar`, data);

        const storage = localStorage.getItem('notifications');
        if(storage) {
            const notifications = JSON.parse(storage);
            const update = notifications.filter((notification: any) => notification.id !== id);
            localStorage.setItem('notifications', JSON.stringify(update));
            dispatch( handleNotifications(update) );
        }

        dispatch( startLoadingTravels() ); 
        toast.success("Solicitud de viaje aprobada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al aprobar solicitud de viaje", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startRejectTravel = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create(`admin/viaje/${id}/rechazar`, {});

        const storage = localStorage.getItem('notifications');
        if(storage) {
            const notifications = JSON.parse(storage);
            const update = notifications.filter((notification: any) => notification.id !== id);
            localStorage.setItem('notifications', JSON.stringify(update));
            dispatch( handleNotifications(update) );
        }

        dispatch( startLoadingTravels() );
        toast.success("Solicitud de viaje rechazada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al aprobar solicitud de viaje", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};


export const startCloseTravel = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create(`/admin/viaje/finalizar/${id}`, data)
        dispatch( startLoadingTravels() ) 
        toast.success("Viaje finalizado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al finalizar el viaje", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startFilterTravels = (data: any): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.create('/admin/viaje/filtro', data)
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

