import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "slices";
import { Action } from "redux";
import { isLoadingOverlay } from "slices/layouts/reducer";

export const withLoadingOverlay = <T>(
  asyncAction: ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => Promise<T>
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
    dispatch(isLoadingOverlay()); // Mostrar el overlay de carga
    try {
      const result = await asyncAction(dispatch); // Ejecutar la acción asíncrona y capturar el resultado
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(isLoadingOverlay()); // Ocultar el overlay de carga
    }
  };
};
