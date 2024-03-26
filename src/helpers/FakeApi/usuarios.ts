interface Usuario {
    id: number,
    dni: number,
    nombre: string,
    apellido: string,
    genero: string,
    email : string,
    telefono: string,
    documentos_y_acciones: {
        documento_frontal: string,
        documento_dorso: string,
        foto_de_rostro: string,
        documentacion_menor: string,
        estado_documentacion: string,
        email_confirmado: string,
        comentario: string
    },
    activo: boolean
}

const usuarios: Usuario[] = [
    {
        id: 1,
        dni: 34777994,
        nombre: "María Alejandra",
        apellido: "Vazquez",
        genero: "Mujer",
        email: "marialevzz890@gmail.com",
        telefono: "+543834786916",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 2,
        dni: 45881688,
        nombre: "Sergio Agustin",
        apellido: "Bazán Romero",
        genero: "Varón",
        email: "agustinbazan589@gmail.com",
        telefono: "+543834622799",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: false
    },
    {
        id: 3,
        dni: 47192699,
        nombre: "marcos jose",
        apellido: "Ferreyra",
        genero: "Varón",
        email: "marcoferreyra941@gmail.com",
        telefono: "+543834645471",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 4,
        dni: 48155422,
        nombre: "Sol",
        apellido: "Batallan",
        genero: "Mujer",
        email: "solbatallan2@gmail.com",
        telefono: "+543834657666",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: false
    },
    {
        id: 5,
        dni: 45567369,
        nombre: "Eduardo",
        apellido: "Reartes",
        genero: "Identidad no binaria",
        email: "eduardoreartes772@gmail.com",
        telefono: "+543834251240",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 6,
        dni: 31648422,
        nombre: "Javier",
        apellido: "Molina",
        genero: "Varón",
        email: "javiermolina2345@gmail.com",
        telefono: "+543834527343",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 7,
        dni: 46178711,
        nombre: "Micaela",
        apellido: "Martinez",
        genero: "Mujer",
        email: "micaelamartinez0819@gmail.com",
        telefono: "+543834053502",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 8,
        dni: 33758629,
        nombre: "Mario",
        apellido: "Busca",
        genero: "Varón",
        email: "mariobusca3@gmail.com",
        telefono: "+543834884077",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    },
    {
        id: 9,
        dni: 48479731,
        nombre: "Micaela",
        apellido: "Busca",
        genero: "Mujer",
        email: "mica11022008@gmail.com",
        telefono: "+543834360823",
        documentos_y_acciones: {
            documento_frontal: "https://images.unsplash.com/photo-1682687220640-9d3b11ca30e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documento_dorso: "https://images.unsplash.com/photo-1707343844436-37580f155ed2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            foto_de_rostro: "https://images.unsplash.com/photo-1707727726616-2db19ad7e6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            documentacion_menor: "",
            estado_documentacion: "Documentación aprobada",
            email_confirmado: "Si",
            comentario: ""
        },
        activo: true
    }
];

export default usuarios;