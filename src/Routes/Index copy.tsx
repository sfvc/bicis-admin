import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import Layout from 'Layout';
import NonAuthLayout from "Layout/NonLayout"
import AuthProtected from './AuthProtected';
import { checkAuthToken } from 'slices/thunk';
import { useSelector } from 'react-redux';

const RouteIndex = () => {
  const { status } = useSelector((state: any) => state.Login)
  
  useEffect(() => {
    checkAuthToken()
  }, [])

  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }
  
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/viajes" />}/>

        {authProtectedRoutes.map((route: any, idx: number) => (
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
      </Routes>
    </React.Fragment>
  );
};

export default RouteIndex;
