import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/about' element={<About />}></Route>
            <Route exact path='/posts' element={<Posts />}></Route>
            <Route exact path='/posts/:id' element={<PostIdPage />}></Route>
            <Route path='/error' element={<Error />}></Route>
            <Route path="*" element={<Navigate to="/error"  />} />
        </Routes>
    );
};
export default AppRouter;