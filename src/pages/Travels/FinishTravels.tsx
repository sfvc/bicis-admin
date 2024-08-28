import React from 'react';
import FinishTravelsTable from 'Common/Components/Travels/Dashboard/FinishTravelsTable';

const FinishTravels = () => {
  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <FinishTravelsTable />
        </div>
    </React.Fragment>
  );
};

export default FinishTravels;