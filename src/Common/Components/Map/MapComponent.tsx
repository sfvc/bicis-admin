import React, { useState } from 'react'
import { X } from 'lucide-react';

const MapComponent = ({ children } : any) => {
    const [ showMap, setShowMap ] = useState <Boolean>(false)

    return (
        <React.Fragment>
            <div className="card">
                {
                    (!showMap) 
                    ? (
                        <div className="bg-[url('assets/images/banner-map.png')] h-16 flex justify-end items-center px-6 mb-4">
                            <button 
                                type="button" 
                                onClick={ () => setShowMap(true) }
                                className="flex text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                Mostrar Mapa
                            </button>
                        </div>
                    )
                    : (
                        <div className='relative'>
                            { children }

                            <button 
                                type="button" 
                                style={{ zIndex: 9999 }}
                                onClick={ () => setShowMap(false) }
                                className="absolute top-6 right-6 flex items-center text-custom-600 btn bg-transparent
                                hover:border-custom-600 focus:border-custom-600"
                            >
                                Mostrar Mapa <X className='ml-2 h-5'></X>
                            </button>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default MapComponent;
