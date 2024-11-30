import React, { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/route.js'
import { AuthContext } from '../context/index.js'
import Loader from './UI/Loader/Loader.jsx';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth);

    if(isLoading){
        return <Loader/>
    }
    return (
        <Routes>
            {isAuth
                ? (<>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/posts" />} />
                </>)
                : (<>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/login" />} />
                </>)
            }
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    );
};
export default AppRouter;