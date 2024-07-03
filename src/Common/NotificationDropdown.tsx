import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { BellRing, Clock } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Dropdown } from './Components/Dropdown';
import useSocket from 'Hooks/useSocket';
import Modal from './Components/Ui/Modal';
import { setActiveTravel } from 'slices/app/travel/reducer';
import { startApproveTravel } from 'slices/app/travel/thunks';
import { handleNotifications } from 'slices/app/notification/reducer';

const NotificationDropdown = () => {
    const { initiateSocket, subscribeToChat } = useSocket('adminViaje');
    const { notifications } = useSelector( (state: any) => state.Notification );
    const { activeTravel } = useSelector( (state: any) => state.Travel );
    const { user } = useSelector( (state: any) => state.Login );
    const dispatch = useDispatch<any>()

    // Modal states
    const [showApprove, setShowApprove] = useState<boolean>(false);

    const onApproveTravel = async(id: number) => {
        dispatch( setActiveTravel(id) );
        toggleApprove();
    }

    const toggleApprove = useCallback(() => {
        if (showApprove) {
            setShowApprove(false);
        } else {
            setShowApprove(true);
        }
    }, [showApprove]);

    const handleApproveTravel = async(action: string) => {
        if (action === 'APROBAR') {
            dispatch( startApproveTravel({ admin_id: user.id }, activeTravel.id) );
        }
        toggleApprove();
    }

    const initLoading = () => {
        const data = localStorage.getItem('notifications')
        if (data) {
            dispatch( handleNotifications(JSON.parse(data)) ) 
        }
    };

    useEffect(() => {
        initLoading()
    }, [])

    useEffect(() => {
        initiateSocket('messageToServer')
        subscribeToChat((error, travel) => {
            const array = new Set( [travel, ...notifications] );
            const data = Array.from(array);
            
            dispatch( handleNotifications(data) )
            localStorage.setItem('notifications', JSON.stringify(data));
        })
    },[])
    
    return (
        <React.Fragment>
            <Dropdown className="relative flex items-center h-header">
                <Dropdown.Trigger type="button" className="inline-flex justify-center relative items-center p-0 text-topbar-item transition-all size-[37.5px] duration-200 ease-linear bg-topbar rounded-md dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200 group-data-[topbar=dark]:text-topbar-item-dark" id="notificationDropdown" data-bs-toggle="dropdown">
                    <BellRing className="inline-block size-5 stroke-1 fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand"></BellRing>
                    {
                        notifications.length > 0 && (
                            <span className="absolute top-0 right-0 flex w-1.5 h-1.5">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                            </span>
                        )
                    }
                </Dropdown.Trigger>
                <Dropdown.Content placement="right-end" className="absolute z-50 ltr:text-left rtl:text-right bg-white rounded-md shadow-md !top-4 dropdown-menu min-w-[20rem] lg:min-w-[26rem] dark:bg-zink-600" aria-labelledby="notificationDropdown">
                    <div className="p-4">
                        <h6 className="text-16">Notificaciones <span className="inline-flex items-center justify-center size-5 ml-1 text-[11px] font-medium border rounded-full text-white bg-orange-500 border-orange-500">{notifications.length}</span></h6>
                    </div>
                    <SimpleBar className="max-h-[350px]">
                        <div className="flex flex-col gap-1">
                            {
                                (notifications.length > 0) && (notifications).map((item: any, index: number) => (
                                    <button key={item.id} onClick={() => onApproveTravel(item.id)} className="flex gap-3 p-3 product-item hover:bg-slate-50 dark:hover:bg-zink-500">
                                        <div className="flex items-center justify-center size-10 bg-red-100 rounded-md shrink-0">
                                            <Clock className="size-5 text-red-500 fill-red-200"></Clock>
                                        </div>

                                        <div className="grow">
                                            <h6 className="flex justify-between mb-1 font-medium">{item.usuario && <b>{item.usuario.nombre} {item.usuario.apellido}</b>} <span className='items-center text-end text-orange-500'><AlertCircle className='inline size-4' /> {item.estado}</span></h6>
                                            {
                                                item.estado === 'PENDIENTE' && 
                                                <div className="text-start p-2 rounded bg-slate-100 text-slate-500 dark:bg-zink-500 dark:text-zink-300">
                                                   {`Hay 1 viaje con bici eléctrica pendiente de aprobación en la estación ${item?.estacion_inicio?.nombre || '-'}`} 
                                                </div>
                                            }
                                            <p className={`text-start text-sm text-slate-500 dark:text-zink-300 ${index === notifications.length - 3 ? "mb-3" : "mb-0"}`}>
                                                <Clock className="inline-block size-3 mr-1"></Clock> <span className="align-middle">{ new Date(item.fecha_inicio).toLocaleString() }</span>
                                            </p>
                                        </div>
                                    </button>
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

            {/* Modal para apobar un viaje*/}
            <Modal show={showApprove} onHide={toggleApprove} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Aprobar Viaje</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <p className="font-semibold text-center text-14">¿Desea aprobar la solicitud de inicio de viaje?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="reset" onClick={() => handleApproveTravel('RECHAZAR')} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">
                            Rechazar
                        </button>
                        <button type="submit" onClick={() => handleApproveTravel('APROBAR')} className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            Aprobar
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default NotificationDropdown;
