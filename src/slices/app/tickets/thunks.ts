import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";
import { handleTickets } from "./reducer";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingTickets = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/provisorio', null)
        console.log(response)
        dispatch( handleTickets(response) );
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateTickets = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/provisorio', {page})
        console.log(response)
        dispatch( handleTickets(response) );
    } catch (error) {
        console.log(error);
    }
};

export const startSavingTicket = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create('admin/provisorio', data)
        dispatch( startLoadingTickets() )
        toast.success("Tipo de ticket creado con exito", { autoClose: 3000, theme: "colored", icon: true }); 
    } catch (error) {
        console.log(error);
        toast.error("Error al crear el tipo de ticket", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdateTicket = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.put(`admin/provisorio/${id}`, data)
        dispatch( startLoadingTickets() )
        toast.success("Tipo de ticket actualizado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al actualizar el tipo de ticket", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeleteTicket = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.delete(`admin/provisorio/${id}`, null)
        dispatch( startLoadingTickets() )
        toast.success("Tipo de ticket eliminado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar el tipo de ticket", { autoClose: 3000, theme: "colored", icon: true });
    }
};