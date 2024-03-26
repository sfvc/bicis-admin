import { Dropdown } from './Components/Dropdown';
import { BellRing, Clock } from 'lucide-react';
import SimpleBar from 'simplebar-react';

interface Notification {
    id: number; type: string; 
    boldtitle?: string; 
    title?: string; 
    description?: string; price?: string; 
    date: string
}

const notification: Notification[] = [
    { id: 1, type: "invite", title: "Viaje pendiente de aprobación para iniciar", description: "Hay 1 viaje con bici eléctrica pendiente de aprobación en la estación Parque de los Niños (CAPE).", date: "Lunes 11:26 AM" },
    { id: 2, type: "invite", title: "Viaje pendiente de aprobación para iniciar", description: "Hay 1 viaje con bici eléctrica pendiente de aprobación en la estación Parque de los Niños (CAPE).", date: "Lunes 11:26 AM" },
    { id: 3, type: "invite", title: "Viaje pendiente de aprobación para iniciar", description: "Hay 1 viaje con bici eléctrica pendiente de aprobación en la estación Parque de los Niños (CAPE).", date: "Lunes 11:26 AM" },
]

const NotificationDropdown = () => {
    return (
        <>
            <Dropdown className="relative flex items-center h-header">
                <Dropdown.Trigger type="button" className="inline-flex justify-center relative items-center p-0 text-topbar-item transition-all size-[37.5px] duration-200 ease-linear bg-topbar rounded-md dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200 group-data-[topbar=dark]:text-topbar-item-dark" id="notificationDropdown" data-bs-toggle="dropdown">
                    <BellRing className="inline-block size-5 stroke-1 fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand"></BellRing>
                    <span className="absolute top-0 right-0 flex w-1.5 h-1.5">
                        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                        <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    </span>
                </Dropdown.Trigger>
                <Dropdown.Content placement="right-end" className="absolute z-50 ltr:text-left rtl:text-right bg-white rounded-md shadow-md !top-4 dropdown-menu min-w-[20rem] lg:min-w-[26rem] dark:bg-zink-600" aria-labelledby="notificationDropdown">
                    <div className="p-4">
                        <h6 className="text-16">Notificaciones <span className="inline-flex items-center justify-center size-5 ml-1 text-[11px] font-medium border rounded-full text-white bg-orange-500 border-orange-500">15</span></h6>
                    </div>
                    <SimpleBar className="max-h-[350px]">
                        <div className="flex flex-col gap-1">
                            {
                                (notification || []).map((item: Notification, index: number) => (
                                    <a key={index} href="#!" className="flex gap-3 p-3 product-item hover:bg-slate-50 dark:hover:bg-zink-500">
                                        <div className="flex items-center justify-center size-10 bg-red-100 rounded-md shrink-0">
                                            <Clock className="size-5 text-red-500 fill-red-200"></Clock>
                                        </div>

                                        <div className="grow">
                                            <h6 className="mb-1 font-medium">{item.boldtitle && <b>{item.boldtitle}</b>} {item.title}</h6>
                                            {item.description && <div className="p-2 rounded bg-slate-100 text-slate-500 dark:bg-zink-500 dark:text-zink-300">{item.description}</div>}
                                            <p className={`text-sm text-slate-500 dark:text-zink-300 ${index === notification.length - 3 ? "mb-3" : "mb-0"}`}>
                                                <Clock className="inline-block size-3 mr-1"></Clock> <span className="align-middle">{item.date}</span>
                                            </p>
                                        </div>
                                    </a>
                                ))
                            }

                        </div>
                    </SimpleBar>
                    <div className="flex items-center gap-2 p-4 border-t border-slate-200 dark:border-zink-500">
                        <div className="grow text-blue-500 font-semibold">
                            <a href="#!" className='flex justify-center'>Ver todas las notificaciones</a>
                        </div>
                    </div>
                </Dropdown.Content >
            </Dropdown >
        </>
    );
};

export default NotificationDropdown;
