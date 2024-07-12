import React from 'react';
import PenaltiesTable from 'Common/Components/Catalog/Penalties/PenaltiesTable';

const CatalogPenalties = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <PenaltiesTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogPenalties;
