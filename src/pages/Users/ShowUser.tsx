import React, { useEffect }  from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "Common/BreadCrumb";
import AccountInfo from "Common/Components/Users/AccountInfo";
import PersonalInfo from "Common/Components/Users/PersonalInfo";

const ShowUser = () => {
    const { activeUser } = useSelector((state: any) => state.User);
    const navigate = useNavigate();

    useEffect(() => {
        if(!activeUser) return navigate("/usuarios");
      }, [])
    
    return (
        <React.Fragment>
        {
            activeUser && (
                <>
                    <BreadCrumb title='Información de Usuario' pageTitle='Usuario' />
                    <AccountInfo />
                    <PersonalInfo />
                </>
            )
        }
        </React.Fragment>
    );
}

export default ShowUser;