import React from 'react';
import TrackersTable from 'Common/Components/Catalog/Trackers/TrackersTable';

const CatalogTrackers = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <TrackersTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogTrackers;
