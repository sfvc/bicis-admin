import React from 'react';
import CountHubs from 'Common/Components/Hubs/CountHubs';
import HubsFilter from 'Common/Components/Hubs/HubsFilter';
import HubsTable from 'Common/Components/Hubs/HubsTable';
import HubsMap from 'Common/Components/Hubs/HubsMap';

const Hubs = () => {

  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <CountHubs />
            <HubsMap />
            <HubsFilter />
            <HubsTable />
        </div>
    </React.Fragment>
  );
};

export default Hubs;
