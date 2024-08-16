import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Tracker {
    id: number,
    codigo: string,
    imei: string,
    bicicleta_id: number,
    traccar_id: string,
    created_at: string,
    updated_at: string
}

interface TrackerState {
    trackers: Tracker[],
    paginate: {
        current: number,
        pageSize: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        total: number,
        totalPages: number
    } | null,
    activeTracker: Tracker | null,
    errorMessage: string | null
}


const initialState: TrackerState  = {
    trackers: [],
    paginate: null,
    activeTracker: null,
    errorMessage: null
}

const trackerCatalogSlice = createSlice({
    name: "trackerCatalog",
    initialState,
    reducers: {
        handleTrackers(state: TrackerState, action: PayloadAction<any>) {
            const { items, ...pagination } = action.payload
            state.trackers = items
            state.paginate = { ...pagination }
            state.activeTracker = null
        },
        handleSearchTracker(state: TrackerState, action: PayloadAction<any>) {
            state.trackers = action.payload
        },
        setActiveTracker(state: TrackerState, action: PayloadAction<number>) {
            state.activeTracker = state.trackers.find((tracker) => tracker.id === action.payload) || null
        },
        resetActiveTracker(state: TrackerState) {
            state.activeTracker = null
        }
    },
});

export const { 
    handleTrackers,
    handleSearchTracker,
    setActiveTracker,
    resetActiveTracker
} = trackerCatalogSlice.actions;

export default trackerCatalogSlice.reducer;
