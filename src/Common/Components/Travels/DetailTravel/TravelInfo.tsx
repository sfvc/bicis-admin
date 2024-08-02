import React, { useEffect, useState } from "react";
import { Calendar, Clock4, MessageCircle, Phone } from "lucide-react";

import hub from 'assets/images/logo-muni.png'
import bike from 'assets/images/bike.png'
import { useSelector } from "react-redux";
import CreateTicket from "../New Travel/CreateTicket";
import Sanction from "../New Travel/Sanction";

interface Date {
    fecha: string, 
    hora: string
}

const initialValue = {
    fecha: '', 
    hora: ''
}
const TravelInfo = () => {
    const { activeTravel } = useSelector((state: any) => state.Travel)
    const [initTravel, setInitTravel] = useState<Date>(initialValue)
    const [finishTravel, setFinishTravel] = useState<Date>(initialValue)

    const formatDateString = () => {
        const inicio = new Date(activeTravel.fecha_inicio).toLocaleString().split(',') // [Fecha, Hora]
        setInitTravel({ fecha: inicio[0], hora: inicio[1] })

        if (activeTravel.fecha_finalizacion) {
            const finalizacion = new Date(activeTravel.fecha_finalizacion).toLocaleString().split(',') // [Fecha, Hora]
            setFinishTravel({ fecha: finalizacion[0], hora: finalizacion[1] })
        }
    }

    useEffect(() => {
        formatDateString()
    }, [])
    

    return (
        <React.Fragment>
            <div className="card mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 card-body">

                    {/* Tarjeta de resumen */}
                    <div className="flex flex-col gap-4 divide-y">
                        <div className="px-4 text-center border-slate-200 dark:border-zink-500">
                            <p className="text-lg font-bold mt-4 text-blue-600 dark:text-slate-200">{activeTravel.id}</p>
                            <p className="text-slate-500 dark:text-zink-200">Número de viaje</p>
                        </div>
                        <div className="px-4 text-center border-slate-200 dark:border-zink-500">
                            <p className="text-lg font-bold mt-4 text-blue-600 dark:text-slate-200">{activeTravel?.duracion || '-'}</p>
                            <p className="text-slate-500 dark:text-zink-200">Duración</p>
                        </div>
                        <div className="px-4 text-center border-slate-200 dark:border-zink-500">
                            <p className="text-lg font-bold mt-4 text-blue-600 dark:text-slate-200">{activeTravel.estado}</p>
                            <p className="text-slate-500 dark:text-zink-200">Estado</p>
                        </div>
                    </div>

                    {/* Info de estaciones */}
                    <div className="grid grid-cols-1 mt-5 lg:mt-0">
                        <div className="pb-5">
                            <div className="flex lg:flex-col gap-4 px-5">
                                <div className="flex-1 border rounded-md border-slate-200 dark:border-zink-500 flex flex-col">
                                    <div className="flex flex-col xl:flex-row sm:items-center gap-3 p-2">
                                        <div className="size-10 rounded-full shrink-0">
                                            <img src={hub} alt="logo-estacion" className="h-10 rounded-full" />
                                        </div>
                                        <div className="grow">
                                            <h6 className="mb-1 truncate ">{activeTravel.estacion_inicio.nombre}</h6>
                                            <p className="text-slate-500 dark:text-zink-200">{activeTravel.estacion_inicio.direccion}</p>
                                        </div>
                                    </div>

                                    <div className="p-2 border-t border-slate-200 dark:border-zink-500">
                                        <div className="flex flex-col gap-3 md:items-center xl:flex-row">
                                            <p className="text-slate-500 dark:text-zink-200 shrink-0"><Calendar className="inline-block size-4 ltr:mr-1 rtl::ml-1" /> <span className="align-middle">{initTravel.fecha}</span></p>
                                            <p className="text-slate-500 dark:text-zink-200 grow"><Clock4 className="inline-block size-4 ltr:mr-1 rtl::ml-1" /> <span className="align-middle">{initTravel.hora}</span></p>
                                        </div>
                                    </div>
                                </div>

                                {
                                    activeTravel.estado === 'FINALIZADO' && (
                                        <div className="flex-1 border rounded-md border-slate-200 dark:border-zink-500 flex flex-col">
                                            <div className="flex flex-col xl:flex-row lg:items-center gap-3 p-2">
                                                <div className="size-10 rounded-full shrink-0">
                                                    <img src={hub} alt="logo-estacion" className="h-10 rounded-full" />
                                                </div>
                                                <div className="grow">
                                                    <h6 className="mb-1">{activeTravel.estacion_final.nombre}</h6>
                                                    <p className="text-slate-500 dark:text-zink-200">{activeTravel.estacion_final.direccion}</p>
                                                </div>
                                            </div>

                                            <div className="p-2 border-t border-slate-200 dark:border-zink-500">
                                                <div className="flex flex-col gap-3 md:items-center xl:flex-row">
                                                    <p className="text-slate-500 dark:text-zink-200 shrink-0"><Calendar className="inline-block size-4 ltr:mr-1 rtl::ml-1" /> <span className="align-middle">{finishTravel.fecha}</span></p>
                                                    <p className="text-slate-500 dark:text-zink-200 grow"><Clock4 className="inline-block size-4 ltr:mr-1 rtl::ml-1" /> <span className="align-middle">{finishTravel.hora}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-1 flex justify-center px-4">
                        {/* Bicicleta */}
                        <div className="flex justify-evenly mt-4">
                            <div>
                                <h6>Unidad</h6>
                                <p className="font-bold text-lg text-cyan-500">{activeTravel.bicicleta.patente}</p>
                                <p>Tipo: Estandar</p>
                                <p>Lock: 37</p>
                                <p>Estado: En el hub</p>
                                <div className="mt-2 text-white font-semibold">
                                    <span className="bg-green-600 px-3 py-1 rounded-xl">Activa</span>
                                </div>
                            </div>

                            <div className="w-28 ml-2">
                                <img src={bike} alt="imagen-bici" />
                            </div>
                        </div>

                        {/* Usuario */}
                        <div className="flex flex-col justify-start ml-6 mt-4"> 
                            <div className="">
                                <h6>Usuario</h6>
                                <p className="font-bold text-lg text-cyan-500">{activeTravel.usuario.nombre} {activeTravel.usuario.apellido}</p>
                                <p><Phone className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></Phone>{activeTravel.usuario.numero_celular}</p>
                            </div>

                            <div className="mt-2">
                                <a href="https://wa.me/543834407708" target="_blank" rel="noreferrer">
                                    <button type="button" className="flex w-full px-8 justify-center gap-x-1 text-white transition-all duration-200 ease-linear btn bg-green-500 border-green-500 hover:bg-green-400 hover:border-green-400 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"><MessageCircle className="size-4"></MessageCircle> WhatsApp</button>
                                </a>
                            </div>

                            {/* <CreateTicket /> */}
                            <Sanction />
                        </div>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default TravelInfo;
