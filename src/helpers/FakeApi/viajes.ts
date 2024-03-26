/* interface Ubicacion {
    latitud: number;
    longitud: number;
    fecha_hora: string;
}
  
interface Viaje {
    id: number;
    id_usuario: number;
    id_bicicleta: number;
    id_estacion_origen: number;
    fecha_origen: string;
    id_estacion_destino: number;
    fecha_destino: string;
    duracion: string;
    estado: string;
    ubicaciones: Ubicacion[];
}
  
interface ViajesData {
    viajes: Viaje[];
} */
  
/* const viajesData: ViajesData = {
    viajes: [
        {
            id: 1,
            id_usuario: 1,
            id_bicicleta: 1,
            id_estacion_origen: 9,
            fecha_origen: "vie. 23 de feb. 22:13:05",
            id_estacion_destino: 3,
            fecha_destino: "vie. 23 de feb. 22:26:00",
            duracion: "12:55",
            estado: "Finalizado",
            ubicaciones: [
                {
                    latitud: -28.4688493,
                    longitud: -65.7796562,
                    fecha_hora: "2023-02-23 22:13:05"
                },
                {
                    latitud: -28.46882980580645,
                    longitud: -65.77897120903226,
                    fecha_hora: "2023-02-23 22:14:05"
                },
                {
                    latitud: -28.468810311612902,
                    longitud: -65.77828621806452,
                    fecha_hora: "2023-02-23 22:15:05"
                },
                {
                    latitud: -28.468790817419354,
                    longitud: -65.77760122709678,
                    fecha_hora: "2023-02-23 22:16:05"
                },
                {
                    latitud: -28.468771323225806,
                    longitud: -65.77691623612904,
                    fecha_hora: "2023-02-23 22:17:05"
                },
                {
                    latitud: -28.468751829032257,
                    longitud: -65.7762312451613,
                    fecha_hora: "2023-02-23 22:18:05"
                },
                {
                    latitud: -28.46873233483871,
                    longitud: -65.77554625419356,
                    fecha_hora: "2023-02-23 22:19:05"
                },
                {
                    latitud: -28.46871284064516,
                    longitud: -65.77486126322582,
                    fecha_hora: "2023-02-23 22:20:05"
                },
                {
                    latitud: -28.468693346451612,
                    longitud: -65.77417627225807,
                    fecha_hora: "2023-02-23 22:21:05"
                },
                {
                    latitud: -28.468673852258064,
                    longitud: -65.77349128129033,
                    fecha_hora: "2023-02-23 22:22:05"
                },
                {
                    latitud: -28.468654358064516,
                    longitud: -65.77280629032259,
                    fecha_hora: "2023-02-23 22:23:05"
                },
                {
                    latitud: -28.468634863870967,
                    longitud: -65.77212129935485,
                    fecha_hora: "2023-02-23 22:24:05"
                },
                {
                    latitud: -28.46861536967742,
                    longitud: -65.77143630838711,
                    fecha_hora: "2023-02-23 22:25:05"
                }
            ]
        },
        {
            id: 2,
            id_usuario: 2,
            id_bicicleta: 2,
            id_estacion_origen: 6,
            fecha_origen: "vie. 23 de feb. 22:03:57",
            id_estacion_destino: 4,
            fecha_destino: "vie. 23 de feb. 22:13:46",
            duracion: "09:48",
            estado: "Finalizado",
            ubicaciones: [
                {
                    latitud: -28.4765769,
                    longitud: -65.7775816,
                    fecha_hora: "2023-02-23 22:03:57"
                },
                {
                    latitud: -28.478330978098473,
                    longitud: -65.77817067979628,
                    fecha_hora: "2023-02-23 22:04:57"
                },
                {
                    latitud: -28.480085056196945,
                    longitud: -65.77875975959253,
                    fecha_hora: "2023-02-23 22:05:57"
                },
                {
                    latitud: -28.481839134295416,
                    longitud: -65.7793488393888,
                    fecha_hora: "2023-02-23 22:06:57"
                },
                {
                    latitud: -28.483593212393888,
                    longitud: -65.77993791918506,
                    fecha_hora: "2023-02-23 22:07:57"
                },
                {
                    latitud: -28.48534729049236,
                    longitud: -65.78052699898133,
                    fecha_hora: "2023-02-23 22:08:57"
                },
                {
                    latitud: -28.48710136859083,
                    longitud: -65.78111607877759,
                    fecha_hora: "2023-02-23 22:09:57"
                },
                {
                    latitud: -28.488855446689303,
                    longitud: -65.78170515857386,
                    fecha_hora: "2023-02-23 22:10:57"
                },
                {
                    latitud: -28.490609524787775,
                    longitud: -65.78229423837011,
                    fecha_hora: "2023-02-23 22:11:57"
                },
                {
                    latitud: -28.49236360288625,
                    longitud: -65.78288331816638,
                    fecha_hora: "2023-02-23 22:12:57"
                }
            ]
        },
        {
            id: 3,
            id_usuario: 3,
            id_bicicleta: 10,
            id_estacion_origen: 1,
            fecha_origen: "vie. 23 de feb. 21:54:55",
            id_estacion_destino: 1,
            fecha_destino: "vie. 23 de feb. 22:37:59",
            duracion: "43:04",
            estado: "Finalizado",
            ubicaciones: [
                {
                    latitud: -28.4767028285847,
                    longitud: -65.78763065219904,
                    fecha_hora: "2023-02-23 21:54:55"
                },
                {
                    latitud: -28.476766326430116,
                    longitud: -65.78755478442085,
                    fecha_hora: "2023-02-23 21:55:55"
                },
                {
                    latitud: -28.47668773114619,
                    longitud: -65.7875288638771,
                    fecha_hora: "2023-02-23 21:56:55"
                },
                {
                    latitud: -28.47660019701436,
                    longitud: -65.78737708777739,
                    fecha_hora: "2023-02-23 21:57:55"
                },
                {
                    latitud: -28.476775915337473,
                    longitud: -65.78744843817105,
                    fecha_hora: "2023-02-23 21:58:55"
                },
                {
                    latitud: -28.476775913695693,
                    longitud: -65.78765910401555,
                    fecha_hora: "2023-02-23 21:59:55"
                },
                {
                    latitud: -28.476594578718448,
                    longitud: -65.78745039160307,
                    fecha_hora: "2023-02-23 22:00:55"
                },
                {
                    latitud: -28.476675756527083,
                    longitud: -65.78752130822805,
                    fecha_hora: "2023-02-23 22:01:55"
                },
                {
                    latitud: -28.476799447438594,
                    longitud: -65.78755049220004,
                    fecha_hora: "2023-02-23 22:02:55"
                },
                {
                    latitud: -28.476698243995642,
                    longitud: -65.78742163237112,
                    fecha_hora: "2023-02-23 22:03:55"
                },
                {
                    latitud: -28.47679884176928,
                    longitud: -65.78737970004775,
                    fecha_hora: "2023-02-23 22:04:55"
                },
                {
                    latitud: -28.476799072975357,
                    longitud: -65.7873896719881,
                    fecha_hora: "2023-02-23 22:05:55"
                },
                {
                    latitud: -28.476728303772845,
                    longitud: -65.78756672175233,
                    fecha_hora: "2023-02-23 22:06:55"
                },
                {
                    latitud: -28.476943828024467,
                    longitud: -65.78751372123759,
                    fecha_hora: "2023-02-23 22:07:55"
                },
                {
                    latitud: -28.47692499178325,
                    longitud: -65.78744967365687,
                    fecha_hora: "2023-02-23 22:08:55"
                },
                {
                    latitud: -28.476808728752925,
                    longitud: -65.7873852454873,
                    fecha_hora: "2023-02-23 22:09:55"
                },
                {
                    latitud: -28.476853783112034,
                    longitud: -65.78753071742379,
                    fecha_hora: "2023-02-23 22:10:55"
                },
                {
                    latitud: -28.47672107526674,
                    longitud: -65.78750136589767,
                    fecha_hora: "2023-02-23 22:11:55"
                },
                {
                    latitud: -28.476843302407552,
                    longitud: -65.7875934334974,
                    fecha_hora: "2023-02-23 22:12:55"
                },
            ]
        },
        {
            id: 4,
            id_usuario: 4,
            id_bicicleta: 8,
            id_estacion_origen: 1,
            fecha_origen: "vie. 23 de feb. 21:50:49",
            id_estacion_destino: 1,
            fecha_destino: "vie. 23 de feb. 22:35:22",
            duracion: "44:33",
            estado: "Finalizado",
            ubicaciones: [
                {
                    latitud: -28.476805476020377,
                    longitud: -65.78743544075694,
                    fecha_hora: "2023-02-23 21:50:49"
                },
                {
                    latitud: -28.47670117325669,
                    longitud: -65.78757474242343,
                    fecha_hora: "2023-02-23 21:51:49"
                },
                {
                    latitud: -28.476742792245066,
                    longitud: -65.7873278065595,
                    fecha_hora: "2023-02-23 21:52:49"
                },
                {
                    latitud: -28.476655635500947,
                    longitud: -65.78756112532923,
                    fecha_hora: "2023-02-23 21:53:49"
                },
                {
                    latitud: -28.476822705309388,
                    longitud: -65.78751500615162,
                    fecha_hora: "2023-02-23 21:54:49"
                },
                {
                    latitud: -28.47678526621466,
                    longitud: -65.78740144827827,
                    fecha_hora: "2023-02-23 21:55:49"
                },
                {
                    latitud: -28.476791710815313,
                    longitud: -65.78760588643165,
                    fecha_hora: "2023-02-23 21:56:49"
                },
                {
                    latitud: -28.476898851494813,
                    longitud: -65.78746005400654,
                    fecha_hora: "2023-02-23 21:57:49"
                },
                {
                    latitud: -28.476722887972294,
                    longitud: -65.78735208572458,
                    fecha_hora: "2023-02-23 21:58:49"
                },
                {
                    latitud: -28.47672639447278,
                    longitud: -65.78764354832346,
                    fecha_hora: "2023-02-23 21:59:49"
                },
                {
                    latitud: -28.476751988654335,
                    longitud: -65.78746433661415,
                    fecha_hora: "2023-02-23 22:00:49"
                },
                {
                    latitud: -28.476775958713336,
                    longitud: -65.78745681172059,
                    fecha_hora: "2023-02-23 22:01:49"
                },
                {
                    latitud: -28.476894037074207,
                    longitud: -65.78740461771282,
                    fecha_hora: "2023-02-23 22:02:49"
                },
                {
                    latitud: -28.476794564532277,
                    longitud: -65.78760649507109,
                    fecha_hora: "2023-02-23 22:03:49"
                },
                {
                    latitud: -28.476786771451653,
                    longitud: -65.78761484566131,
                    fecha_hora: "2023-02-23 22:04:49"
                },
                {
                    latitud: -28.476832727726922,
                    longitud: -65.78743060584344,
                    fecha_hora: "2023-02-23 22:05:49"
                },
                {
                    latitud: -28.476768628571165,
                    longitud: -65.78745310153268,
                    fecha_hora: "2023-02-23 22:06:49"
                },
                {
                    latitud: -28.47671209491432,
                    longitud: -65.78745775071498,
                    fecha_hora: "2023-02-23 22:07:49"
                },
                {
                    latitud: -28.476563881409877,
                    longitud: -65.78744815517906,
                    fecha_hora: "2023-02-23 22:08:49"
                },
                {
                    latitud: -28.476735042218717,
                    longitud: -65.78755080247217,
                    fecha_hora: "2023-02-23 22:09:49"
                },
                {
                    latitud: -28.476726744960928,
                    longitud: -65.78745957463029,
                    fecha_hora: "2023-02-23 22:10:49"
                },
                {
                    latitud: -28.476759944591578,
                    longitud: -65.78745349275268,
                    fecha_hora: "2023-02-23 22:11:49"
                },
                {
                    latitud: -28.47694437712153,
                    longitud: -65.78755423514181,
                    fecha_hora: "2023-02-23 22:12:49"
                },
                {
                    latitud: -28.476755151387543,
                    longitud: -65.78729622254889,
                    fecha_hora: "2023-02-23 22:13:49"
                },
                {
                    latitud: -28.476746476979006,
                    longitud: -65.78743541670792,
                    fecha_hora: "2023-02-23 22:14:49"
                },
                {
                    latitud: -28.476506175788753,
                    longitud: -65.78760193034972,
                    fecha_hora: "2023-02-23 22:15:49"
                },
                {
                    latitud: -28.476771736096477,
                    longitud: -65.78741714463915,
                    fecha_hora: "2023-02-23 22:16:49"
                },
                {
                    latitud: -28.476722345265767,
                    longitud: -65.78758026816703,
                    fecha_hora: "2023-02-23 22:17:49"
                }
            ]
        }
    ]
}; */

const viajesData: any = [
    {
        id: 1,
        usuario: {
            id: 1,
            nombre: 'Esteban',
            apellido: 'Robert'
        },
        unidad: {
            id: 1,
            patente: "CC048",
            tipo_unidad: "MECANICA"
        },
        estacion_origen: "NODO",
        fecha_origen: "vie. 23 de feb. 22:13:05",
        estacion_destino: "Plaza 25 de Mayo",
        fecha_destino: "vie. 23 de feb. 22:26:00",
        duracion: "12:55",
        estado: "FINALIZADO",
        ubicaciones: [
            {
                latitud: -28.4688493,
                longitud: -65.7796562,
                fecha_hora: "2023-02-23 22:13:05"
            },
            {
                latitud: -28.46882980580645,
                longitud: -65.77897120903226,
                fecha_hora: "2023-02-23 22:14:05"
            },
            {
                latitud: -28.468810311612902,
                longitud: -65.77828621806452,
                fecha_hora: "2023-02-23 22:15:05"
            },
            {
                latitud: -28.468790817419354,
                longitud: -65.77760122709678,
                fecha_hora: "2023-02-23 22:16:05"
            },
            {
                latitud: -28.468771323225806,
                longitud: -65.77691623612904,
                fecha_hora: "2023-02-23 22:17:05"
            },
            {
                latitud: -28.468751829032257,
                longitud: -65.7762312451613,
                fecha_hora: "2023-02-23 22:18:05"
            },
            {
                latitud: -28.46873233483871,
                longitud: -65.77554625419356,
                fecha_hora: "2023-02-23 22:19:05"
            },
            {
                latitud: -28.46871284064516,
                longitud: -65.77486126322582,
                fecha_hora: "2023-02-23 22:20:05"
            },
            {
                latitud: -28.468693346451612,
                longitud: -65.77417627225807,
                fecha_hora: "2023-02-23 22:21:05"
            },
            {
                latitud: -28.468673852258064,
                longitud: -65.77349128129033,
                fecha_hora: "2023-02-23 22:22:05"
            },
            {
                latitud: -28.468654358064516,
                longitud: -65.77280629032259,
                fecha_hora: "2023-02-23 22:23:05"
            },
            {
                latitud: -28.468634863870967,
                longitud: -65.77212129935485,
                fecha_hora: "2023-02-23 22:24:05"
            },
            {
                latitud: -28.46861536967742,
                longitud: -65.77143630838711,
                fecha_hora: "2023-02-23 22:25:05"
            }
        ]
    },
    {
        id: 2,
        usuario: {
            id: 2,
            nombre: 'Juan',
            apellido: 'Lorenzo'
        },
        unidad: {
            id: 8,
            patente: "CC050",
            tipo_unidad: "ELECTRICA"
        },
        estacion_origen: "UNCA",
        fecha_origen: "vie. 23 de feb. 22:13:05",
        estacion_destino: "Parque de los niños",
        fecha_destino: null,
        duracion: null,
        estado: "EN VIAJE",
        ubicaciones: [
            {
                latitud: -28.4688493,
                longitud: -65.7796562,
                fecha_hora: "2023-02-23 22:13:05"
            },
            {
                latitud: -28.46882980580645,
                longitud: -65.77897120903226,
                fecha_hora: "2023-02-23 22:14:05"
            },
            {
                latitud: -28.468810311612902,
                longitud: -65.77828621806452,
                fecha_hora: "2023-02-23 22:15:05"
            },
            {
                latitud: -28.468790817419354,
                longitud: -65.77760122709678,
                fecha_hora: "2023-02-23 22:16:05"
            },
            {
                latitud: -28.468771323225806,
                longitud: -65.77691623612904,
                fecha_hora: "2023-02-23 22:17:05"
            },
            {
                latitud: -28.468751829032257,
                longitud: -65.7762312451613,
                fecha_hora: "2023-02-23 22:18:05"
            },
            {
                latitud: -28.46873233483871,
                longitud: -65.77554625419356,
                fecha_hora: "2023-02-23 22:19:05"
            },
            {
                latitud: -28.46871284064516,
                longitud: -65.77486126322582,
                fecha_hora: "2023-02-23 22:20:05"
            },
            {
                latitud: -28.468693346451612,
                longitud: -65.77417627225807,
                fecha_hora: "2023-02-23 22:21:05"
            },
            {
                latitud: -28.468673852258064,
                longitud: -65.77349128129033,
                fecha_hora: "2023-02-23 22:22:05"
            },
            {
                latitud: -28.468654358064516,
                longitud: -65.77280629032259,
                fecha_hora: "2023-02-23 22:23:05"
            },
            {
                latitud: -28.468634863870967,
                longitud: -65.77212129935485,
                fecha_hora: "2023-02-23 22:24:05"
            },
            {
                latitud: -28.46861536967742,
                longitud: -65.77143630838711,
                fecha_hora: "2023-02-23 22:25:05"
            }
        ]
    }
]
  
export default viajesData;
  