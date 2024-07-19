import React from 'react';
import SanctionsFilter from 'Common/Components/Sanctions/SanctionsFilter';
import SanctionsTable from 'Common/Components/Sanctions/SanctionsTable';

const Sanctions = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <SanctionsFilter />
            <SanctionsTable />
        </div>
    </React.Fragment>
  );
};

export default Sanctions;
