import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";
import { handleTravels } from "./reducer";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingTravels = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/viaje', null)
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateTravels = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/viaje', {page})
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingTravel = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.create('/viaje', data)
        toast.success("Viaje creado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al crear el viaje", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startCloseTravel = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.create(`/viaje/${id}/finalizar`, data)
        toast.success("Viaje finalizado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al finalizar el viaje", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startFilterTravels = (data: any): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.create('/viaje/filtro', data)
        dispatch( handleTravels(response) ); 
    } catch (error) {
        console.log(error);
    }
};

/* export const startUpdateTravel = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.update(`http://localhost:1000/api/v1/viaje/${id}`, data)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};

export const startDeleteTravel = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.delete(`http://localhost:1000/api/v1/viaje/${id}`, data)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}; */