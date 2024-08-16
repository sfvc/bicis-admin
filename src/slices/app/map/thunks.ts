import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { APIClient } from "helpers/api_helper";
import { handleTravelsMap } from "./reducer"; 
import 'react-toastify/dist/ReactToastify.css';

const api = new APIClient();

export const startLoadingTravelsMap = (): ThunkAction<void, RootState, unknown, Action<string>> =>  async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    try {
        const response: any = await api.get('/admin/viaje/activos', null);
        console.log("Travels fetched from API:", response);
        dispatch( handleTravelsMap(response) );
    } catch (error) {
        console.error("Error fetching travels:", error);
    }
};

