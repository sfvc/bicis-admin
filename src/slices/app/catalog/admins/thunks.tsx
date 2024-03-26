import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { addNewAdmin, handleAdmins } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingAdmins = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/usuario', {})
        dispatch(handleAdmins(response));
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateAdmins = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/usuario', {page})
        dispatch(handleAdmins(response));
    } catch (error) {
        console.log(error);
    }
};

export const startSavingAdmin = (data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response: any = await api.create('/usuario', data)
        dispatch( addNewAdmin(response) )
        toast.success("Usuario creado con exito", { autoClose: 3000, theme: "colored", icon: true }); 
    } catch (error) {
        console.log(error);
        toast.error("Error al crear el usuario", { autoClose: 3000, theme: "colored", icon: true });
    }
};

export const startUpdateAdmin = (data: any, id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.update(`/usuario/${id}`, data)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};