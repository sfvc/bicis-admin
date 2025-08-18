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

/* export const getSearchUnits = async (patente: any) => {
    if(patente.length < 3) return []
    const response: any = await api.get(`/admin/bicicleta/select?patente=${patente}`, null);
    const list = formatSelect(response)
    return list;
} */

export const getSearchUnits = async (patente: any) => {
    try {
        if(patente.length < 3) return []
        const data: any = await api.get(`admin/bicicleta/search?patente=${patente}`, null);
        // const list = formatSelect(response)
        // return list;

        if(data.statusCode === 404) return []

        return [
            {
                label: data.patente,
                value: data.id
            }
        ]
    } catch (error) {
        console.log(error)
    }
    
}

