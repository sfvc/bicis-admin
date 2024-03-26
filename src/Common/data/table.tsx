
const basic = [
    { name: "Jennifer Chang", position: "Regional Director", age: 28, office: "Singapore", startDate: "2010/11/14", salary: "$357,650" },
    { name: "Gavin Joyce", position: "Developer", age: 42, office: "Edinburgh", startDate: "2010/12/22", salary: "$92,575" },
    { name: "Angelica Ramos", position: "Chief Executive Officer (CEO)", age: 47, office: "London", startDate: "2009/10/09", salary: "$1,200,000" },
    { name: "Doris Wilder", position: "Sales Assistant", age: 23, office: "Sidney", startDate: "2010/09/20", salary: "$85,600" },
    { name: "Caesar Vance", position: "Pre-Sales Support", age: 21, office: "New York", startDate: "2011/12/12", salary: "$106,450" },
    { name: "Yuri Berry", position: "Chief Marketing Officer (CMO)", age: 40, office: "New York", startDate: "2009/06/25", salary: "$675,000" },
    { name: "Jenette Caldwell", position: "Development Lead", age: 30, office: "New York", startDate: "2011/09/03", salary: "$345,000" },
    { name: "Dai Rios", position: "Personnel Lead", age: 35, office: "Edinburgh", startDate: "2012/09/26", salary: "$217,500" },
    { name: "Bradley Greer", position: "Software Engineer", age: 41, office: "London", startDate: "2012/10/13", salary: "$132,000" },
    { name: "Gloria Little", position: "Systems Administrator", age: 59, office: "New York", startDate: "2009/04/10", salary: "$237,500" },
    { name: "Paul Byrd", position: "Chief Financial Officer (CFO)", age: 64, office: "New York", startDate: "2010/06/09", salary: "$725,000" },
    { name: "Michael Silva", position: "Marketing Designer", age: 66, office: "London", startDate: "2012/11/27", salary: "$198,500" },
    { name: "Tatyana Fitzpatrick", position: "Regional Director", age: 19, office: "London", startDate: "2010/03/17", salary: "$385,750" },
    { name: "Haley Kennedy", position: "Senior Marketing Designer", age: 43, office: "London", startDate: "2012/12/18", salary: "$313,500" },
    { name: "Charde Marshall", position: "SRegional Director", age: 36, office: "San Francisco", startDate: "2008/10/16", salary: "$470,600" },
    { name: "Quinn Flynn", position: "Support Lead", age: 22, office: "Edinburgh", startDate: "2013/03/03", salary: "$342,000" },
    { name: "Jena Gaines", position: "Office Manager", age: 30, office: "London", startDate: "2008/12/19", salary: "$90,560" },
    { name: "Sonya Frost", position: "Software Engineer", age: 23, office: "Edinburgh", startDate: "2008/12/13", salary: "$103,600" },
    { name: "Colleen Hurst", position: "Javascript Developer", age: 39, office: "San Francisco", startDate: "2009/09/15", salary: "$205,500" },
    { name: "Rhona Davidson", position: "Integration Specialist", age: 55, office: "Tokyo", startDate: "2010/10/14", salary: "$327,900" },
    { name: "Herrod Chandler", position: "Sales Assistant", age: 59, office: "San Francisco", startDate: "2012/08/06", salary: "$137,500" },
    { name: "Brielle Williamson", position: "Integration Specialist", age: 62, office: "New York", startDate: "2012/12/02", salary: "$372,000" },
    { name: "Airi Satou", position: "Accountant", age: 33, office: "Tokyo", startDate: "2008/11/28", salary: "$162,700" },
    { name: "Cedric Kelly", position: "Senior Javascript Developer", age: 22, office: "Edinburgh", startDate: "2012/03/29", salary: "$433,060" },
    { name: "Ashton Cox", position: "Junior Technical Author", age: 66, office: "San Francisco", startDate: "2009/01/12", salary: "$86,000" },
    { name: "Garrett Winters", position: "Accountant", age: 63, office: "Tokyo", startDate: "2011/07/25", salary: "$170,750" },
    { name: "Tiger Nixon", position: "System Architect", age: 61, office: "Edinburgh", startDate: "2011/04/25", salary: "$320,800" }
];

const reactTableData = [
    { name: "Tiger Nixon", position: "System Architect", office: "Edinburgh", age: 61, startDate: "2011-04-25", salary: "$320,800" },
    { name: "Garrett Winters", position: "Accountant", office: "Tokyo", age: 63, startDate: "2011-07-25", salary: "$170,750" },
    { name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", age: 66, startDate: "2009-01-12", salary: "$86,000" },
    { name: "Cedric Kelly", position: "Senior Javascript Developer", office: "Edinburgh", age: 22, startDate: "2012-03-29", salary: "$433,060" },
    { name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, startDate: "2008-11-28", salary: "$162,700" },
    { name: "Brielle Williamson", position: "Integration Specialist", office: "New York", age: 61, startDate: "2012-12-02", salary: "$372,000" },
    { name: "Herrod Chandler", position: "Sales Assistant", office: "San Francisco", age: 59, startDate: "2012-08-06", salary: "$137,500" },
    { name: "Rhona Davidson", position: "Integration Specialist", office: "Tokyo", age: 55, startDate: "2010-10-14", salary: "$327,900" }
]

const usersData = [
    { id: 1, nombre: "Tiger", apellido: "Nixon", email: "test@email.com", condicion: 'Activo', estado: "Documentacion aprobada" },
    { id: 2, nombre: "Garrett", apellido: "Winters", email: "test@email.com", condicion: 'Inactivo', estado: "Documentacion aprobada" },
    { id: 3, nombre: "Ashton", apellido: "Cox", email: "test@email.com", condicion: 'Activo', estado: "Documentación pendiente por el usuario" },
    { id: 4, nombre: "Cedric", apellido: "Kelly", email: "test@email.com", condicion: 'Activo', estado: "Documentacion aprobada" },
    { id: 5, nombre: "Airi", apellido: "Satou", email: "test@email.com", condicion: 'Inactivo', estado: "Documentación pendiente para revisión" },
    { id: 6, nombre: "Brielle", apellido: "Williamson", email: "test@email.com", condicion: 'Activo', estado: "Documentación pendiente para revisión" },
    { id: 7, nombre: "Herrod", apellido: "Chandler", email: "test@email.com", condicion: 'Activo', estado: "Documentacion aprobada" },
    { id: 8, nombre: "Rhona", apellido: "Davidson", email: "test@email.com", condicion: 'Inactivo', estado: "Documentacion aprobada" }
]

const hubsData = [
    { id: 1, nombre: "Punto Giro (Valle Chico)", prioridad: "Alta", indice: 40, libres: 2, unidades: 15 },
    { id: 2, nombre: "Parque de los Niños (CAPE)", prioridad: "Baja", indice: 50, libres: 12, unidades: 7 },
    { id: 3, nombre: "Plaza 25 de Agosto", prioridad: "Alta", indice: 75, libres: 5, unidades: 4 },
    { id: 4, nombre: "Plaza Virgen del Valle (UNCA)", prioridad: "Alta", indice: 30, libres: 8, unidades: 10 },
    { id: 5, nombre: "NODO", prioridad: "Alta", indice: 80, libres: 9, unidades: 8 },
    { id: 6, nombre: "ISAC", prioridad: "Baja", indice: 45, libres: 5, unidades: 8 },
    { id: 7, nombre: "IFD", prioridad: "Alta", indice: 90, libres: 10, unidades: 10 },
    { id: 8, nombre: "Plaza 25 de Mayo (Catedral)", prioridad: "Baja", indice: 20, libres: 3, unidades: 10 }
]

const unitsData = [
    { id: 1, patente: "CC045", tipo: "Estandar", condicion: 'Inactiva', direccion: 'España 1942', estado: 'En base' },
    { id: 2, patente: "CC046", tipo: "Adaptada", condicion: 'Inactiva', direccion: 'Sin datos', estado: 'En base' },
    { id: 3, patente: "CC080", tipo: "Estandar", condicion: 'Activa', direccion: 'Sin datos', estado: 'Inconsistente' },
    { id: 4, patente: "CC099", tipo: "Estandar", condicion: 'Inactiva', direccion: 'Sin datos', estado: 'En base' },
    { id: 5, patente: "CC030", tipo: "Estandar", condicion: 'Activa', direccion: 'Sin datos', estado: 'Inconsistente' },
    { id: 6, patente: "CC047", tipo: "Adaptada", condicion: 'Inactiva', direccion: 'Alvear 144', estado: 'En base' },
    { id: 7, patente: "CC023", tipo: "Estandar", condicion: 'Inactiva', direccion: 'Sin datos', estado: 'En base' },
    { id: 8, patente: "CC018", tipo: "Adaptada", condicion: 'Activa', direccion: 'Sin datos', estado: 'Inconsistente' }
]

// Datos para select
const bikesData = [
    { value: 1, label: "CC045" },
    { value: 2, label: "CC046"},
    { value: 3, label: "CC050"},
    { value: 4, label: "CC080"},
    { value: 5, label: "CC099"},
    { value: 6, label: "CC030"},
    { value: 7, label: "CC047"}
]

export { basic, reactTableData, usersData , hubsData, unitsData, bikesData };