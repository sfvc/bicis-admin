import React from 'react';
import TicketsFilter from 'Common/Components/Tickets/TicketsFilter';
import TicketsTable from 'Common/Components/Tickets/TicketsTable';

const Tickets = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <TicketsFilter />
            <TicketsTable />
        </div>
    </React.Fragment>
  );
};

export default Tickets;
