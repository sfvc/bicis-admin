import React from 'react';
// import UnitsFilter from 'Common/Components/Catalog/Units/UnitFilter';
import UnitsTable from 'Common/Components/Catalog/Units/UnitsTable';

const CatalogUnits = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            {/* <UnitsFilter /> */}
            <UnitsTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogUnits;
