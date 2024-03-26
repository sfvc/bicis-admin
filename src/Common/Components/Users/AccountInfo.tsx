import React from "react";
import { BadgeCheck, MapPin, MessageCircle, Phone } from "lucide-react";

// Image
import avatar1 from "assets/images/users/avatar-1.png";
import { useDispatch, useSelector } from "react-redux";
import InitTravel from "../Travels/New Travel/InitTravel";
import { startActiveUser } from "slices/app/user/thunks";

const AccountInfo = () => {
    const { activeUser } = useSelector( (state: any) => state.User)
    const dispatch = useDispatch<any>()

    function enableUser () {
        dispatch( startActiveUser(activeUser.id) )
    }

    return (
        <React.Fragment>
            <div className="card p-5">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:grid-cols-12">
                    <div className="lg:col-span-2 2xl:col-span-1">
                        <div className="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28">
                            <img src={avatar1} alt="Foto de usuario" className="object-cover border-0 rounded-full img-thumbnail user-profile-image" />
                        </div>
                    </div>
                    <div className="lg:col-span-10 2xl:col-span-9">
                        <h5 className="mb-1">{activeUser.nombre} {activeUser.apellido} <BadgeCheck className="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20"></BadgeCheck></h5>
                        <div className="flex gap-3 mb-4">
                            <p className="text-slate-500 dark:text-zink-200"><MapPin className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></MapPin> Argentina</p>
                            <p className="text-slate-500 dark:text-zink-200"><Phone className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></Phone> Cel: +543834870697</p>
                        </div>

                        <p className="mt-4 text-slate-500 dark:text-zink-200">Strong leader and negotiator adept at driving collaboration and innovation. Highly accomplished CEO & Founder with 10+ years of experience creating, launching and leading successful business ventures. Proven ability to build relationships, drive customer loyalty and increase profitability.</p>
                    </div>
                    <div className="lg:col-span-12 2xl:col-span-2">
                        <div className="flex justify-center gap-2 2xl:flex-col 2xl:justify-end">
                            <a href="https://wa.me/543834407708" target="_blank" rel="noreferrer">
                                <button type="button" className="w-full flex justify-center gap-x-1 text-green-500 transition-all duration-200 ease-linear btn bg-white border-green-500 hover:bg-green-100 hover:border-green-100 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"><MessageCircle className="size-4"></MessageCircle> WhatsApp</button>
                            </a>

                            {
                                (!activeUser.activo)
                                    ? <button onClick={enableUser} type="button" className="px-8 text-white transition-all duration-200 ease-linear btn bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20">Activar</button>
                                    : <button onClick={enableUser} type="button" className="px-8 text-white transition-all duration-200 ease-linear btn bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-red-400/20">Inhabilitar</button>
                            }

                            <InitTravel />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AccountInfo;