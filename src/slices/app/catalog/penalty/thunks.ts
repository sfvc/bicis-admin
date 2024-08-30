import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";
import { handlePenalties } from "./reducer";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingPenalties = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/penalidad', null)
        dispatch( handlePenalties(response) );
    } catch (error) {
        console.log(error);
    }
};

export const startPaginatePenalties = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/penalidad', {page})
        dispatch( handlePenalties(response) );
    } catch (error) {
        console.log(error);
    }
};

export const startSavingPenalty = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create('admin/penalidad', data)
        dispatch( startLoadingPenalties() )
        toast.success("Tipo de penalidad creada con exito", { autoClose: 3000, theme: "colored", icon: true }); 
    } catch (error) {
        console.log(error);
        toast.error("Error al crear el tipo de penalidad", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdatePenalty = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.put(`admin/penalidad/${id}`, data)
        dispatch( startLoadingPenalties() )
        toast.success("Tipo de penalidad actualizada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al actualizar el tipo de penalidad", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeletePenalty = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.delete(`admin/penalidad/${id}`, null)
        dispatch( startLoadingPenalties() )
        toast.success("Tipo de penalidad eliminada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar el tipo de penalidad", { autoClose: 3000, theme: "colored", icon: true });
    }
};