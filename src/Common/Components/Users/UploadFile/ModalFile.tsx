import React, { useState } from 'react'
import { PenIcon } from 'lucide-react'
import Modal from 'Common/Components/Ui/Modal'
import { Nav } from 'Common/Components/Ui/Tab/Nav'
import Tab from 'Common/Components/Ui/Tab/Tab'
import UploadFile from './UploadFile'

const ModalFile = ({ activeUser, handleInputChange }: any) => {
    const [show, setShow] = useState<boolean>(false);

    const toggle = () => setShow(!show)

    return (
        <React.Fragment>
            <div>
                <button 
                type="button" 
                onClick={toggle} 
                className="w-full mt-2 bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                >
                    <PenIcon className="mr-1 inline-block size-3 text-custom-500 fill-sky-100 dark:fill-custom-500/20"></PenIcon>
                    Editar Documentación
                </button>
            </div>

            <Modal show={show} onHide={toggle} modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen md:w-[40rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">Editar Documentación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <div>
                        <Tab.Container defaultActiveKey="foto">
                            <Nav className="flex justify-between w-full text-sm font-medium text-center border-b border-slate-200 dark:border-zink-500 nav-tabs">
                                <Nav.Item eventKey="foto" className="group">
                                    <a href="#!" data-tab-toggle data-target="foto" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">Foto de Rostro</a>
                                </Nav.Item>
                                <Nav.Item eventKey="documento_frontal" className="group">
                                    <a href="#!" data-tab-toggle data-target="documento_frontal" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">Frente de Documento</a>
                                </Nav.Item>
                                <Nav.Item eventKey="documento_dorsal" className="group">
                                    <a href="#!" data-tab-toggle data-target="documento_dorsal" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">Dorso de Documento</a>
                                </Nav.Item>
                                <Nav.Item eventKey="documentacion_menor" className="group">
                                    <a href="#!" data-tab-toggle data-target="documentacion_menor" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 active:text-custom-500 dark:hover:text-custom-500 dark:active:text-custom-500 dark:group-[.active]:hover:text-custom-500 -mb-[1px]">Documentación de Menor</a>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content className="mt-5 tab-content">
                                <Tab.Pane eventKey="foto" id="foto">
                                    <UploadFile 
                                        input="foto"
                                        src={activeUser.foto}
                                        alt="Foto de Rostro"
                                        handleInputChange={handleInputChange}
                                    />
                                </Tab.Pane>

                                <Tab.Pane eventKey="documento_frontal" id="documento_frontal">
                                    <UploadFile 
                                        input="documento_frontal"
                                        src={activeUser.documento_frontal}
                                        alt="Frente de Documento"
                                        handleInputChange={handleInputChange}
                                    />
                                </Tab.Pane>

                                <Tab.Pane eventKey="documento_dorsal" id="documento_dorsal">
                                    <UploadFile 
                                        input="documento_dorsal"
                                        src={activeUser.documento_dorsal}
                                        alt="Dorso de Documento"
                                        handleInputChange={handleInputChange}
                                    />
                                </Tab.Pane>

                                <Tab.Pane eventKey="documentacion_menor" id="documentacion_menor">
                                    <UploadFile 
                                        input="documentacion_menor"
                                        src={activeUser.documentacion_menor}
                                        alt="Documentación de Menor"
                                        handleInputChange={handleInputChange}
                                    />
                                </Tab.Pane>
                            </Tab.Content> 
                        </Tab.Container>

                        <div className="flex justify-end gap-2 mt-5">
                            <button type="button" onClick={toggle} className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Cancelar</button>
                            <button type="button" onClick={toggle} className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                Aceptar
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ModalFile