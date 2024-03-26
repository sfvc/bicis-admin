import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// userApp
import UserReducer from "./app/user/reducer";

// Travels
import TravelReducer from "./app/travel/reducer";

// Catalog
import hubCatalogReducer from "./app/catalog/hubs/reducer";
import unitCatalogReducer from "./app/catalog/units/reducer";
import adminCatalogReducer from "./app/catalog/admins/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Travel: TravelReducer,
    User: UserReducer,
    HubCatalog: hubCatalogReducer,
    UnitCatalog: unitCatalogReducer,
    AdminCatalog: adminCatalogReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;