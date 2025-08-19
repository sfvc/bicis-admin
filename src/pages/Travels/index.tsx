/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// import CountTravels from 'Common/Components/Travels/Dashboard/CountTravels';
// import TravelsFilter from 'Common/Components/Travels/Dashboard/TravelsFilter';
import TravelsMap from 'Common/Components/Travels/Dashboard/TravelsMap';
import TravelsTable from 'Common/Components/Travels/Dashboard/TravelsTable';
import useSocket from 'Hooks/useSocket';
import { useDispatch } from 'react-redux';
import { startLoadingTravels } from 'slices/app/travel/thunks';
import { startLoadingTravelsMap } from 'slices/app/map/thunks';

const url = process.env.REACT_APP_SOCKET_BACK || '';

const Travels = () => {
  const { initiateSocket, subscribeToChat } = useSocket(url, 'adminViaje');
  const dispatch = useDispatch<any>();

  useEffect(()=>{
    initiateSocket('messageToServer')
    subscribeToChat( async(error, msg) => {
        await dispatch( startLoadingTravels() );
        await dispatch( startLoadingTravelsMap() );
    })
  },[])

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            {/* <CountTravels /> */}
            {/* <TravelsFilter /> */}
            <TravelsMap />
            <TravelsTable />
        </div>
    </React.Fragment>
  );
};

export default Travels;
