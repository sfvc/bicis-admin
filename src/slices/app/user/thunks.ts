import { Action, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { withLoadingOverlay } from "helpers/withLoadingOverlay";
import { handleUsers, setStatusUser } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingUsers = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/admin/usuario', null)
        dispatch( handleUsers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateUsers = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/admin/usuario', {page})
        dispatch( handleUsers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startUpdateUser = (id: number, data: any): ThunkAction<void, RootState, unknown, Action<string>> => {
    return withLoadingOverlay ( async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        try {
            const response = await api.put(`/admin/usuario/${id}`, data)
            if(response.status === 400) return response.data.message
            toast.success("Usuario actualizado con exito", { autoClose: 3000, theme: "colored", icon: true });
            return true 
        } catch (error) {
            toast.error("Error al actualizar el usuario", { autoClose: 3000, theme: "colored", icon: true });
        }  
    });
};

export const startActiveUser = (id: number, data: any): ThunkAction<void, RootState, unknown, Action<string>> => {
    return withLoadingOverlay ( async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        try {
            await api.put(`/admin/usuario/${id}`, data)
            dispatch( setStatusUser() )
            toast.success("Usuario hablitado con exito", { autoClose: 3000, theme: "colored", icon: true });
        } catch (error) {
            toast.error("Error al habilitar el usuario", { autoClose: 3000, theme: "colored", icon: true });
        }  
    });
};

