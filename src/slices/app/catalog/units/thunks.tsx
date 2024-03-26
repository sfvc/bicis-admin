import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { addNewUnit, handleUnits } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingUnits = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/bicicleta', null)
        dispatch( handleUnits(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateUnits = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/bicicleta', {page})
        dispatch( handleUnits(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startSavingUnit = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response: any = await api.create('/bicicleta', data)
        dispatch( addNewUnit(response) )
        toast.success("Unidad creada con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al crear la unidad", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

export const startUpdateUnit = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.update(`/bicicleta/${id}`, data)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};

export const startDeleteUnit = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.delete(`/bicicleta/${id}`, data)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};