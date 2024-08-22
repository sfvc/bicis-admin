import React from 'react';
import CountHubs from 'Common/Components/Hubs/CountHubs';
import HubsFilter from 'Common/Components/Hubs/HubsFilter';
import HubsMap from 'Common/Components/Hubs/HubsMap';
import HubsTable from 'Common/Components/Catalog/Hubs/HubsTable';

const Hubs = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            {/* <CountHubs /> */}
            <HubsMap />
            {/* <HubsFilter /> */}
            <HubsTable />
        </div>
    </React.Fragment>
  );
};

export default Hubs;
