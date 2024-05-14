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
        const response = await api.create('/login', user)
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
        const authUser = localStorage.getItem("authUser");

        if (!authUser) {
            localStorage.removeItem("authUser");
            dispatch(logoutSuccess());
            return null
        }

        const {token} = JSON.parse(authUser)
        setAuthorization(token)

        const response: any = await api.get('/profile', null)
        dispatch(loginSuccess(response));

    } catch (error) {
        dispatch(loginError(error));
    }
}