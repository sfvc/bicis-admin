import React from "react";

interface Promps {
    title: string
}

const COLUMNS = 5;

export const Skeleton = ({ title }: Promps) => {
    return (
        <div className="col-span-12 card 2xl:col-span-12">
            <div className="card-body">
                <div className="grid items-center grid-cols-1 gap-3 mb-5 2xl:grid-cols-12">
                    <div className="2xl:col-span-3">
                        <h6 className="text-15">{title}</h6>
                    </div>
                </div>
                
                <div role="status" className="space-y-2.5 animate-pulse w-full mb-4">
                    {
                        Array.from({length: COLUMNS}).map(( _, index) => (
                            <div key={index} className="flex justify-between items-center w-full gap-0.5">
                                <div className="h-4 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-4 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-4 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-4 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}