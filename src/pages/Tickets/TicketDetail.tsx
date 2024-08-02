import { createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronsLeft, Send, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import avatar1 from 'assets/images/users/avatar-1.png'
import avatar5 from 'assets/images/users/avatar-5.png'
import userDummayImage from "assets/images/users/user-dummy-img.jpg";

const TicketDetail = () => {
    const [Chat_Box_Username, setChat_Box_Username] = useState<any>("Marie Prohaska");
    const [Chat_Box_Image, setChat_Box_Image] = useState<any>(avatar5);
    const [Chat_Box_Desiganation, setChat_Box_Desiganation] = useState<any>("Angular Developer");
    const [currentRoomId, setCurrentRoomId] = useState<any>(1);

    // Responsive
    const dispatch = useDispatch<any>();

    const selectDataList = createSelector(
        (state: any) => state.Chat,
        (state) => ({
            dataList: state.chats
        })
    );

    const { dataList } = useSelector(selectDataList);
    const [data, setData] = useState<any>([]);

    // Get Message
    useEffect(() => {
        // dispatch(onGetChat(currentRoomId));
    }, [dispatch, currentRoomId]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    // Add Message
    const [curMessage, setcurMessage] = useState<string>("");
    const addMessage = () => {
        if (curMessage !== '') {
            const message: any = {
                id: Math.floor(Math.random() * 100),
                msg: curMessage,
                img: avatar1,
                isSender: true,
            };
            // dispatch(onAddChat(message));
        }
        setcurMessage("");
    };

    const onKeyPress = (e: any) => {
        const { key, value } = e;
        if (key === "Enter") {
            e.preventDefault();
            setcurMessage(value);
            addMessage();
        }
    };

    // Retun To Contact
    const retunToContact = () => {
        document.querySelector(".menu-content")?.classList.remove("hidden");
        document.querySelector(".chat-content")?.classList.remove("show");
    };

    const chatRef = useRef<any>(null);

    useEffect(() => {
        if (chatRef.current?.el) {
            chatRef.current.getScrollElement().scrollTop = chatRef.current.getScrollElement().scrollHeight;
        }
    }, [data]);

    return (
        <React.Fragment>
            <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
                <div className="flex gap-5 mt-5">
                    <div id='chartlist' className={`h-[calc(100vh_-_theme('spacing.10')_*_6)] xl:min-h-[calc(100vh_-_theme('height.header')_*_2.4)] card w-full [&.show]:block [&.active]:xl:block chat-content active`}>
                        <div className="relative flex flex-col h-full">
                            <div className="card-body">
                                <div className="flex items-center gap-3">
                                    <button className="inline-flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md shrink-0 bg-slate-100 text-slate-500 dark:bg-zink-600 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500" onClick={retunToContact}><ChevronsLeft className="size-4 mx-auto" /></button>
                                    <Link to="#!" data-drawer-target="drawerEnd" className="flex items-center gap-3 ltr:mr-auto rtl:ml-auto shrink-0" id="userChatProfile">
                                        <div className="size-10 rounded-full bg-slate-100 dark:bg-zink-600">
                                            {Chat_Box_Image === undefined ? (
                                                <img src={userDummayImage} className="h-10 rounded-full" alt="" />
                                            ) : (
                                                <img src={Chat_Box_Image} className="h-10 rounded-full" alt="" />
                                            )}
                                        </div>
                                        <div>
                                            <h6> {Chat_Box_Username}</h6>
                                            <p className="text-sm text-slate-500 dark:text-zink-200">{Chat_Box_Desiganation}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 dark:bg-zink-600/50 grow">
                                <div className="absolute inset-x-0 top-0 z-10 hidden transition-all duration-200 ease-linear bg-white border-y border-slate-200 dark:bg-zink-700 dark:border-zink-500" id="searchChat">
                                    <input type="text" className="w-full px-5 py-2 focus:outline-none" placeholder="Search for ..." autoComplete="off" />
                                </div>
                                <SimpleBar ref={chatRef} className="h-[calc(100vh_-_410px)] xl:h-[calc(100vh_-_330px)]">
                                    <ul className="flex flex-col gap-5 list-none card-body">
                                        {(data || []).map((msg: any, key: number) => (
                                            <React.Fragment key={key}>
                                                {(msg.usermessages || []).map((item: any, key: number) => (<li className={`flex chat-message group/item [&.right]:justify-end ${item.isSender && "right"}`} key={key}>
                                                    <div className="flex gap-3">
                                                        <Link to="#!" className="flex items-center self-end justify-center text-sm font-semibold rounded-full size-9 bg-slate-100 text-slate-500 dark:bg-zink-600 dark:text-zink-200 shrink-0 group-[.right]/item:order-3">
                                                            {!item.isSender ? <img src={Chat_Box_Image || userDummayImage} alt="" className="object-cover rounded-full h-9" /> : <img src={avatar1} alt="" className="object-cover rounded-full h-9" />}
                                                        </Link>
                                                        <div className="grow group-[.right]/item:order-2 flex flex-col gap-3">
                                                            <div className="flex gap-3">
                                                                <div className="relative p-4 bg-white dark:bg-zink-700 rounded-md ltr:rounded-bl-none rtl:rounded-br-none shadow-sm 2xl:max-w-sm ltr:group-[.right]/item:rounded-br-none rtl:group-[.right]/item:rounded-bl-none ltr:group-[.right]/item:rounded-bl-md rtl:group-[.right]/item:rounded-br-md group-[.right]/item:order-2">
                                                                    {item.bookmark && <Star className="block size-2 rtl:ml-2 ltr:mr-2" />}
                                                                    {item.msg}
                                                                    {item.attachments && <div className="grid grid-cols-2 gap-4 mt-4 2xl:grid-cols-3">
                                                                        {(item.attachments || []).map((item: any, key: number) => (<Link to="#!" key={key}>
                                                                            <img src={item.img} alt="" className="rounded-md" />
                                                                        </Link>))}
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </SimpleBar>
                            </div>
                            <div className="card-body">
                                <div className="flex items-center gap-2">
                                    <div className="grow">
                                        <input type="text" id="inputText" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Escriba su mensaje aquí ..."
                                            value={curMessage}
                                            onKeyDown={onKeyPress}
                                            onChange={e => setcurMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20" disabled={!curMessage} onClick={addMessage}><Send className="inline-block size-4 mr-1 align-middle" /> <span className="align-middle">Envíar</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TicketDetail;