import React from "react"
import { Calendar } from "lucide-react";

const UpcomingScheduledData = [
    {
        id: 1,
        date: "Jue. 25 De Abr. De 2024",
        time: "11:35 Hs",
        user: "German Camilo Chamorro",
        status: "En viaje"
    },
    {
        id: 2,
        date: "Jue. 25 De Abr. De 2024",
        time: "11:50 Hs",
        user: "German Camilo Chamorro",
        status: "Pausado"
    },
    {
        id: 3,
        date: "Jue. 25 De Abr. De 2024",
        time: "12:00 Hs",
        user: "German Camilo Chamorro",
        status: "En viaje"
    },
    {
        id: 4,
        date: "Jue. 25 De Abr. De 2024",
        time: "12:10 Hs",
        user: "German Camilo Chamorro",
        status: "Finalizado"
    },
];

const TravelHistory = () => {
  return (
    <React.Fragment>
        <div className="col-span-12 md:order-9 lg:col-span-6 lg:row-span-2 xl:col-span-4 xl:row-span-2 2xl:row-span-2 2xl:col-span-3 ">
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-3 text-15 grow">Bitácora de cambios de estado</h6>

                    <div className="flex flex-col gap-4 mt-3">
                        {(UpcomingScheduledData || []).map((item: any) => (<div className="flex gap-3" key={item.id}>
                            <Calendar className="flex flex-col items-center justify-center size-5 border rounded-sm border-slate-200 dark:border-zink-500 shrink-0" />
                            <div className="grow">
                                <h6 className="mb-1">{item.date} {item.time && <small className="inline-block px-2 font-medium border border-transparent rounded text-[11px] py-0.5 bg-slate-100 text-slate-500 dark:bg-slate-500/20 dark:text-zink-200 dark:border-transparent">{item.time}</small>}</h6>
                                <p className="text-slate-500 dark:text-zink-200">El usuario <strong className="text-cyan-500">{item.user}</strong> cambió el estado del viaje a <strong className="text-cyan-500">{item.status}</strong></p>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default TravelHistory;
