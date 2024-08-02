import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum PrioridadEnum {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    BAJA = 'BAJA',
}

interface Ticket {
    id: number,
    nombre: string,
    prioridad: PrioridadEnum,
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

const ticketCatalogSlice = createSlice({
    name: "ticketCatalog",
    initialState,
    reducers: {
        handleTickets(state: TicketState, action: PayloadAction<any>) {
            const { items, ...paginate } = action.payload
            state.tickets = items
            state.paginate = { ...paginate }
            state.activeTicket = null
        },
        handleSearchTicket(state: TicketState, action: PayloadAction<any>) {
            state.tickets = action.payload
        },
        addNewTicket(state: TicketState, action: PayloadAction<Ticket>) {
            state.tickets = [...state.tickets, action.payload]
        },
        setActiveTicket(state: TicketState, action: PayloadAction<number>) {
            state.activeTicket = state.tickets.find((ticket) => ticket.id === action.payload) || null
        }
    },
});

export const { 
    handleTickets, 
    handleSearchTicket,
    addNewTicket,
    setActiveTicket 
} = ticketCatalogSlice.actions;

export default ticketCatalogSlice.reducer;
