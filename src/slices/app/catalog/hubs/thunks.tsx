import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { handleHubs } from "./reducer";
import { toast } from "react-toastify";

const api = new APIClient();

export const startLoadingHubs = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/estacion', null)
        dispatch( handleHubs(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateHubs = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/estacion', { page });
        dispatch( handleHubs(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingHub = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create('/admin/estacion', data)
        dispatch( startLoadingHubs() )
        toast.success("Estación creada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al crear la estación", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdateHub = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response = await api.update(`/estacion/${id}`, data)
        console.log(response)
        toast.success("Estación editada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al editar la estación", { autoClose: 3000, theme: "colored", icon: true });
    }
};