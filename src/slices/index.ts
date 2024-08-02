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

// Sanctions
import SanctionReducer from "./app/sanctions/reducer";

// Tickets
import TicketReducer from "./app/tickets/reducer";

// Chats
import ChatReducer from "./app/chat/reducer";

// Catalog
import hubCatalogReducer from "./app/catalog/hubs/reducer";
import unitCatalogReducer from "./app/catalog/units/reducer";
import adminCatalogReducer from "./app/catalog/admins/reducer";
import penaltyCatalogReducer from "./app/catalog/penalty/reducer";
import typesTicketCatalogReducer from "./app/catalog/types_ticket/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Travel: TravelReducer,
    User: UserReducer,
    Notification: NotificationReducer,
    Sanction: SanctionReducer,
    Ticket: TicketReducer,
    Chat: ChatReducer,
    // Catalogo
    HubCatalog: hubCatalogReducer,
    UnitCatalog: unitCatalogReducer,
    AdminCatalog: adminCatalogReducer,
    PenaltyCatalog: penaltyCatalogReducer,
    TypesTicketCatalog: typesTicketCatalogReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;