/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authProtectedRoutesAdmin, authProtectedRoutesAgente, publicRoutes } from './allRoutes';
import Layout from 'Layout';
import NonAuthLayout from "Layout/NonLayout"
import LoadingOverlay from 'Layout/LoadingOverlay';
import AuthProtected from './AuthProtected';
import { checkAuthToken } from 'slices/thunk';

const RouteIndex = () => {
  const { user, status } = useSelector((state: any) => state.Login)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(checkAuthToken());
  }, [])

  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <React.Fragment>
      <Routes>
        {
          (status === 'autenthicated')
            ? (<>
                <Route path="/" element={<Navigate to="/viajes" />}/>
                {(user.rol === "ADMIN" ? authProtectedRoutesAdmin : authProtectedRoutesAgente).map((route: any, idx: number) => (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      <AuthProtected>
                        <Layout>
                          <route.component />
                        </Layout>
                      </AuthProtected>
                    }
                  />
                ))}
              </>)
            : (<>
              <Route path="/*" element={<Navigate to="/login" />}/>
                {publicRoutes.map((route: any, idx: number) => (
                  <Route
                    path={route.path}
                    key={idx}
                    element={
                      <NonAuthLayout>
                        <route.component />
                      </NonAuthLayout>
                    } />
                ))}
              </>)
        }
      </Routes>

      <LoadingOverlay />
    </React.Fragment>
  );
};

export default RouteIndex;
