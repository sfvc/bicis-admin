import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { handleAdmins } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingAdmins = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/administrador', null)
        dispatch(handleAdmins(response));
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateAdmins = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('admin/administrador', {page})
        dispatch(handleAdmins(response));
    } catch (error) {
        console.log(error);
    }
};

export const startSavingAdmin = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.create('admin/administrador', data)
        dispatch( startLoadingAdmins() )
        toast.success("Usuario creado con exito", { autoClose: 3000, theme: "colored", icon: true }); 
    } catch (error) {
        console.log(error);
        toast.error("Error al crear el usuario", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdateAdmin = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.put(`admin/administrador/${id}`, data);
        dispatch( startLoadingAdmins() );
        toast.success("Usuario editado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al editar el usuario", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeleteAdmin = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response = await api.delete(`admin/administrador/${id}`, null)
        console.log(response)
        dispatch( startLoadingAdmins() );
        toast.success("Usuario eliminado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar el usuario", { autoClose: 3000, theme: "colored", icon: true });
    }
};