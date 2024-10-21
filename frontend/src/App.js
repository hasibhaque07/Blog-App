import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage />}/>
        <Route path='/login' element={ <LoginPage />}/>
        <Route path='/signup' element={ <SignupPage />}/>
        <Route path='/dashboard' element={ <Dashboard />}/>
        <Route path='/profile-page' element={ <ProfilePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
