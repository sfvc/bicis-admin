import Users from "pages/Users";
import ShowUser from "pages/Users/ShowUser";
import Hubs from "pages/Hubs";
import Units from "pages/Units";
import Travels from "pages/Travels";
import NewTravel from "pages/Travels/NewTravel";
import TravelDetail from "pages/Travels/TravelDetail";
import Sanctions from "pages/Sanctions";
import Tickets from "pages/Tickets";
import TicketDetail from "pages/Tickets/TicketDetail";

import CatalogHubs from "pages/Catalog/Hubs";
import NewHub from "pages/Catalog/Hubs/NewHub";
import CatalogUnits from "pages/Catalog/Units";

import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import CatalogAdmins from "pages/Catalog/Admins";
import CatalogPenalties from "pages/Catalog/Penalties";
import CatalogTickets from "pages/Catalog/Tickets";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Viajes
  { path: "/viajes", component: Travels },
  { path: "/nuevo-viaje", component: NewTravel },
  { path: "/detalle-viaje/:id", component: TravelDetail },

  // Usuarios
  { path: "/usuarios", component: Users },
  { path: "/usuarios/:id", component: ShowUser },

  // Hubs
  { path: "/hubs", component: Hubs },

  // Unidades
  { path: "/unidades", component: Units },

  // Sanciones
  { path: "/sanciones", component: Sanctions },

  // Tickets
  { path: "/tickets", component: Tickets },
  { path: "/detalle-ticket/:id", component: TicketDetail },

  // Catalogo
    // Estaciones
    { path: "/catalogo/estaciones", component: CatalogHubs },
    { path: "/catalogo/nueva-estacion", component: NewHub },

    // Unidades
    { path: "/catalogo/unidades", component: CatalogUnits },

    // Administradores
    { path: "/catalogo/administradores", component: CatalogAdmins },

    // Penalties
    { path: "/catalogo/tipo-penalidad", component: CatalogPenalties },

    // Tickets
    { path: "/catalogo/tipo-ticket", component: CatalogTickets },
];

const publicRoutes = [

  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout }

]

export { authProtectedRoutes, publicRoutes };
