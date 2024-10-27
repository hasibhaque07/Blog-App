import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
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
        <Route path='/dashboard' element={ <ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path='/profile-page' element={ <ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
        <Route path='/edit-profile-page' element={ <ProtectedRoute><EditProfilePage /></ProtectedRoute>}/>
        <Route path='/add-post' element={ <ProtectedRoute><AddPost /></ProtectedRoute>}/>
        <Route path='/edit-blog-post' element={ <ProtectedRoute><EditBlogPost /></ProtectedRoute>}/>
        <Route path='/view-blog-post' element={ <ProtectedRoute><ViewBlogPost /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
