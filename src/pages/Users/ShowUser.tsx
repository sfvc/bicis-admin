import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import AccountInfo from "Common/Components/Users/AccountInfo";
import PersonalInfo from "Common/Components/Users/PersonalInfo";

const ShowUser = () => {
    return (
        <React.Fragment>
            <BreadCrumb title='Información de Usuario' pageTitle='Usuario' />
              <AccountInfo />
              <PersonalInfo />
        </React.Fragment>
    );
}

export default ShowUser;