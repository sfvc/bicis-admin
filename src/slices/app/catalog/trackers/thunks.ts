import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { handleTrackers } from "./reducer";
import { toast } from "react-toastify";
import { withLoadingOverlay } from "helpers/withLoadingOverlay";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingTrackers = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/tracker', null)
        dispatch( handleTrackers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateTrackers = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/tracker', {page})
        dispatch( handleTrackers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingTracker = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => {
    return withLoadingOverlay ( async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        try {
            const response: any = await api.create('/admin/tracker', data);
            if (response.status === 400) return response.data.message;
            dispatch( startLoadingTrackers() );
            toast.success("Tracker creado con éxito", { autoClose: 3000, theme: "colored", icon: true });
            return true;
        } catch (error) {
            toast.error("Error al crear la tracker", { autoClose: 3000, theme: "colored", icon: true });
        }  
    });
};

export const startUpdateTracker = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.put(`/admin/tracker/${id}`, data);
        if(response.status === 400) return response.data.message;
        dispatch( startLoadingTrackers() );
        toast.success("Tracker editado con exito", { autoClose: 3000, theme: "colored", icon: true });
        return true
    } catch (error) {
        console.log(error);
        toast.error("Error al editar la tracker", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startDeleteTracker = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        await api.delete(`/admin/tracker/${id}`, null);
        dispatch( startLoadingTrackers() );
        toast.success("Tracker eliminado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        console.log(error);
        toast.error("Error al eliminar el tracker", { autoClose: 3000, theme: "colored", icon: true });
    }
};