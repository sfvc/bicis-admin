import React from 'react';
import UserTable from 'Common/Components/Users/UsersTable';
import UsersFilter from 'Common/Components/Users/UsersFilter';
import CountUsers from 'Common/Components/Users/CountUsers';

const Users = () => {

  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <CountUsers />
            <UsersFilter />
            <UserTable />
        </div>
    </React.Fragment>
  );
};

export default Users;
