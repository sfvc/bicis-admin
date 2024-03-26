import { APIClient } from "./api_helper"

const api = new APIClient();

export const getAllHubs = async () => {
    const data = await api.get('http://localhost:1000/api/v1/estacion/select', {});
    return data;
}

export const getAllUnits = async () => {
    const data = await api.get('http://localhost:1000/api/v1/bicicleta', {});
    return data;
}