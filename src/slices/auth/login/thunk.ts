import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";
import { APIClient, setAuthorization } from "helpers/api_helper";

const api = new APIClient();
interface User {
    username: string;
    password: string;
}

export const loginUser = (
    user: User,
    history: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
    try {
        const response = await api.create('http://localhost:1000/api/v1/login', user)
        if (response) {
            dispatch(loginSuccess(response));
            history("/");
        }
    } catch (error) {
        dispatch(loginError(error));
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        localStorage.removeItem("authUser");
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(loginError(error));
    }
}

export const checkAuthToken = () => async (dispatch: Dispatch<any>) => {
    try {
        localStorage.removeItem("authUser");
        dispatch(logoutSuccess());

        // const authUser = localStorage.getItem("authUser");
        // if (!authUser) return dispatch(logoutUser());

        // const { token } = JSON.parse(authUser);
        // setAuthorization(token);

        // const data = await api.get('http://localhost:1000/api/v1/profile', {})
        // dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginError(error));
    }
}