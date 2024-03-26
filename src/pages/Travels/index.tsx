import React from 'react';
// import CountTravels from 'Common/Components/Travels/Dashboard/CountTravels';
// import TravelsMap from 'Common/Components/Travels/Dashboard/TravelsMap';
import TravelsFilter from 'Common/Components/Travels/Dashboard/TravelsFilter';
import TravelsTable from 'Common/Components/Travels/Dashboard/TravelsTable';

const Travels = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            {/* <CountTravels /> */}
            {/* <TravelsMap /> */}
            <TravelsFilter />
            <TravelsTable />
        </div>
    </React.Fragment>
  );
};

export default Travels;
