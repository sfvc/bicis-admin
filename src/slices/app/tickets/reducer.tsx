import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
    id: number,
    usuario: object,
    estado: string,
    tipo_ticket: string,
    updated_at: string,
    created_at: string,
}

interface TicketState {
    tickets: Ticket[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeTicket: Ticket | null
}

const initialState: TicketState  = {
    tickets: [],
    paginate: null,
    activeTicket: null
}

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        handleTickets(state: TicketState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.tickets = items
            state.paginate = { ...paginate }
            state.activeTicket = null
        },
        setActiveTicket(state: TicketState, action: PayloadAction<number>) {
            state.activeTicket = state.tickets.find((ticket) => ticket.id === action.payload) || null
        }
    },
});

export const { 
    handleTickets, 
    setActiveTicket 
} = ticketSlice.actions;

export default ticketSlice.reducer;
