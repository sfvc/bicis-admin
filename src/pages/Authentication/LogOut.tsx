import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "slices/thunk";
import { Navigate } from "react-router-dom";
import { RootState } from "slices";
import { createSelector } from 'reselect';

interface selectLogoutState {
    status: string;
}

const Logout: React.FC = () => {

    const dispatch = useDispatch<any>();

    const selectLogout = createSelector(
        (state: RootState) => state.Login as selectLogoutState,
        (login) => ({
            status: login.status
        })
    );

    const { status } = useSelector(selectLogout);

    React.useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return status === 'not-authenticated' ? <Navigate to="/login" /> : null;
}

export default Logout;
