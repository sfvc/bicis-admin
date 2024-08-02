import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypesTicket {
    id: number,
    usuario: object,
    estado: string,
    tipo_ticket: string,
    updated_at: string,
    created_at: string,
}

interface TypesTicketState {
    typesTicket: TypesTicket[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeTicket: TypesTicket | null
}

const initialState: TypesTicketState  = {
    typesTicket: [],
    paginate: null,
    activeTicket: null
}

const typesTicketSlice = createSlice({
    name: "typesTicket",
    initialState,
    reducers: {
        handleTypesTicket(state: TypesTicketState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.typesTicket = items
            state.paginate = { ...paginate }
            state.activeTicket = null
        },
        setActiveTypeTicket(state: TypesTicketState, action: PayloadAction<number>) {
            state.activeTicket = state.typesTicket.find((ticket) => ticket.id === action.payload) || null
        }
    },
});

export const { 
    handleTypesTicket, 
    setActiveTypeTicket 
} = typesTicketSlice.actions;

export default typesTicketSlice.reducer;
