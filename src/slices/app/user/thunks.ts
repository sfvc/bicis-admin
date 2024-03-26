import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { toast } from "react-toastify";
import { handleUsers, setStatusUser } from "./reducer";
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingUsers = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/persona', null)
        dispatch( handleUsers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startPaginateUsers = (page: number): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: Dispatch) => {
    try {
        const response: any = await api.get('/persona', {page})
        dispatch( handleUsers(response) ); 
    } catch (error) {
        console.log(error);
    }
};

export const startActiveUser = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.get(`/persona/${id}/active`, null)
        dispatch( setStatusUser() )
        toast.success("Usuario hablitado con exito", { autoClose: 3000, theme: "colored", icon: true });
    } catch (error) {
        toast.error("Error al habilitar el usuario", { autoClose: 3000, theme: "colored", icon: true });
        console.log(error);
    }
};

