import React from 'react';
import HubsTable from 'Common/Components/Catalog/Hubs/HubsTable';

const CatalogHubs = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <HubsTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogHubs;
