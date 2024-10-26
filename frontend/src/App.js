import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPost from './pages/AddPost';
import Dashboard from './pages/Dashboard';
import EditBlogPost from './pages/EditBlogPost';
import EditProfilePage from './pages/EditProfilePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import ViewBlogPost from './pages/ViewBlogPost';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <HomePage />}/>
        <Route path='/login' element={ <LoginPage />}/>
        <Route path='/signup' element={ <SignupPage />}/>
        <Route path='/dashboard' element={ <Dashboard />}/>
        <Route path='/profile-page' element={ <ProfilePage />}/>
        <Route path='/edit-profile-page' element={ <EditProfilePage />}/>
        <Route path='/add-post' element={ <AddPost />}/>
        <Route path='/edit-blog-post' element={ <EditBlogPost />}/>
        <Route path='/view-blog-post' element={ <ViewBlogPost />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
