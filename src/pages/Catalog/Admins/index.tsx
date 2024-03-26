import AdminsTable from 'Common/Components/Catalog/Admins/AdminsTable';
import React from 'react';

const CatalogAdmins = () => {

  return (
    <React.Fragment>
        <div className="pt-4 container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <AdminsTable />
        </div>
    </React.Fragment>
  );
};

export default CatalogAdmins;
