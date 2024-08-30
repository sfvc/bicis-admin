import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { handleSanctions } from "./reducer";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";

const api = new APIClient();

export const startLoadingSanctions = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response = await api.get('/admin/sancion', null)
        dispatch( handleSanctions(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateSanctions = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response = await api.get('/admin/sancion', { page });
        dispatch( handleSanctions(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingSanction = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create('/admin/sancion', data);
        dispatch( startLoadingSanctions() );
        toast.success("Sanción creada con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Error al crear la sanción", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdateSanction = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        console.log(data)
        const response = await api.put(`/admin/sancion/${id}`, data);
        console.log(response)
        dispatch( startLoadingSanctions() );
        toast.success("Sanción editada con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Error al editar la sanción", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeleteSanction = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.delete(`/admin/sancion/${id}`, null);
        dispatch( startLoadingSanctions() );
        toast.success("Sanción eliminada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar la sanción", { autoClose: 3000, theme: "colored", icon: true });
    }
};