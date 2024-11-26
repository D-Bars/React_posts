import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Error from './pages/Error';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;
