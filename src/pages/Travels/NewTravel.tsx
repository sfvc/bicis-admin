import React from "react";
import SearchUser from "Common/Components/Travels/New Travel/SearchUser";
import UserTable from "Common/Components/Users/UsersTable";

const NewTravel = () => {
  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <SearchUser />
            <UserTable />
        </div>
    </React.Fragment>
  )
}

export default NewTravel;
