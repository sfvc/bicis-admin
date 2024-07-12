import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// userApp
import UserReducer from "./app/user/reducer";

// Travels
import TravelReducer from "./app/travel/reducer";

// Notifications
import NotificationReducer from "./app/notification/reducer";

// Catalog
import hubCatalogReducer from "./app/catalog/hubs/reducer";
import unitCatalogReducer from "./app/catalog/units/reducer";
import adminCatalogReducer from "./app/catalog/admins/reducer";
import penaltyCatalogReducer from "./app/catalog/penalty/reducer";
import ticketCatalogReducer from "./app/catalog/tickets/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Travel: TravelReducer,
    User: UserReducer,
    Notification: NotificationReducer,
    HubCatalog: hubCatalogReducer,
    UnitCatalog: unitCatalogReducer,
    AdminCatalog: adminCatalogReducer,
    PenaltyCatalog: penaltyCatalogReducer,
    TicketCatalog: ticketCatalogReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;