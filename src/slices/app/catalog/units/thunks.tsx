import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { handleUnits } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingUnits = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/bicicleta', null)
        dispatch( handleUnits(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateUnits = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/bicicleta', {page})
        dispatch( handleUnits(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingUnit = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.create('/admin/bicicleta', data)
        if(response.status === 400) return response.data.message;
        dispatch( startLoadingUnits() );
        toast.success("Unidad creada con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true;
    } catch (error) {
        toast.error("Error al crear la unidad", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startUpdateUnit = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.put(`/admin/bicicleta/${id}`, data);
        if(response.status === 400) return response.data.message;
        dispatch( startLoadingUnits() );
        toast.success("Bicicleta editada con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true
    } catch (error) {
        console.log(error);
        toast.error("Error al editar la bicicleta", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeleteUnit = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.delete(`/admin/bicicleta/${id}`, null);
        dispatch( startLoadingUnits() );
        toast.success("Bicicleta eliminada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar la bicicleta", { autoClose: 3000, theme: "colored", icon: true });
    }
};