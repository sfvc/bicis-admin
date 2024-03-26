import React from 'react';
import CountUnits from 'Common/Components/Units/CountUnits';
import UnitsFilter from 'Common/Components/Units/UnitFilter';
import UnitsTable from 'Common/Components/Units/UnitsTable';

const Units = () => {

  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <CountUnits />
            <UnitsFilter />
            <UnitsTable />
        </div>
    </React.Fragment>
  );
};

export default Units;
