import { Bike, ListCollapse, LocateFixed, Map, PenLine, UserRound } from "lucide-react";

const menuData: any = [
    {
        label: 'menu',
        isTitle: true,
    },
    {
        id: "viajes",
        label: 'Viajes',
        link: "/#",
        icon: <Map />,
        subItems: [
            {
                id: 'viajesdashboard',
                label: 'Dashboard',
                link: '/viajes',
                parentId: "viajes"
            },
            {
                id: 'iniciar_viaje',
                label: 'Iniciar Viaje',
                link: '/nuevo-viaje',
                parentId: "viajes"
            },
        ]
    },
    {
        id: "hubs",
        label: 'Hubs',
        link: "/#",
        icon: <LocateFixed />,
        subItems: [
            {
                id: 'hubsdashboard',
                label: 'Dashboard',
                link: '/hubs',
                parentId: "hubs"
            },
        ]
    },
    {
        id: "unidades",
        label: 'Unidades',
        link: "/#",
        icon: <Bike />,
        subItems: [
            {
                id: 'unidadesdashboard',
                label: 'Dashboard',
                link: '/unidades',
                parentId: "unidades"
            },
        ]
    },
    {
        id: "usuarios",
        label: 'Usuarios',
        link: "/#",
        icon: <UserRound />,
        subItems: [
            {
                id: 'usuariosdashboard',
                label: 'Dashboard',
                link: '/usuarios',
                parentId: "usuarios"
            },
        ]
    },
    {
        id: "catalogos",
        label: 'Catálogos',
        link: "/#",
        icon: <ListCollapse />,
        subItems: [
            {
                id: 'administradores',
                label: 'Administradores',
                link: '/catalogo/administradores',
                parentId: "catalogos"
            },
            {
                id: 'tipodespot',
                label: 'Tipo de Spot',
                link: '/catalogo/tipo-spot',
                parentId: "catalogos"
            },
            {
                id: 'tiposdepenalidad',
                label: 'Tipos de Penalidad',
                link: '/catalogo/tipo-penalidad',
                parentId: "catalogos"
            },
            {
                id: 'hubs',
                label: 'Hubs',
                link: '/catalogo/estaciones',
                parentId: "catalogos"
            },
            {
                id: 'locks',
                label: 'Locks',
                link: '/catalogo/locks',
                parentId: "catalogos"
            },
            {
                id: 'unidades',
                label: 'Unidades',
                link: '/catalogo/unidades',
                parentId: "catalogos"
            },
            {
                id: 'tiposdeticket',
                label: 'Tipos de Ticket',
                link: '/catalogo/tipo-ticket',
                parentId: "catalogos"
            },
            {
                id: 'razonesparataller',
                label: 'Razones para Taller',
                link: '/catalogo/razones',
                parentId: "catalogos"
            },
            {
                id: 'categoriasfaq',
                label: 'Categoria FAQ',
                link: '/catalogo/categorias',
                parentId: "catalogos"
            },
            {
                id: 'categoriasfaq',
                label: 'Preguntas Frecuentes',
                link: '/catalogo/preguntas-frecuentes',
                parentId: "catalogos"
            }
        ]
    },
];

export { menuData };