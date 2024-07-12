import React from 'react';
import TicketsTable from 'Common/Components/Catalog/Tickets/TicketsTable';

const CatalogTickets = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <TicketsTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogTickets;
