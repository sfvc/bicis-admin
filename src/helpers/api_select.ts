import { APIClient } from "./api_helper"

const api = new APIClient();

export const formatSelect = (data: any) => {
    const list = data.map((element: any) => {
        return { label: element.patente, value: element.id }
    })

    return list
}

export const getAllHubs = async () => {
    const data = await api.get('/admin/estacion/select', null);
    return data;
}

export const getSearchUnits = async (patente: any) => {
    if(patente.length < 3) return []
    const response: any = await api.get(`/admin/bicicleta/select?patente=${patente}`, null);
    const list = formatSelect(response)
    return list;
}

