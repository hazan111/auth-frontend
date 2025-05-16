import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';


import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import ProfilePage from './routes/ProfilePage';
import AdminPage from './routes/AdminPage';
import CreateRolePage from './routes/CreateRolePage';
import NotAuthorized from './routes/NotAuthorized';
import ProtectedRoute from './routes/ProtectedRoute';
import ForgotPasswordPage from './routes/ForgotPasswordPage';
import ResetPasswordPage from './routes/ResetPasswordPage';
import AdminLayout from './routes/AdminPanel/AdminLayout';
import Dashboard from './routes/AdminPanel/Dashboard';
import UsersPage from './routes/AdminPanel/UsersPage';
import RolesPage from './routes/AdminPanel/RolesPage';
import RoleEditPage from './routes/AdminPanel/RoleEditPage';
import CreateUserPage from './routes/AdminPanel/CreateUserPage';
import PermissionsPage from './routes/AdminPanel/PermissionsPage';






export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<HomePage />} />

        {/* Giriş & Kayıt */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="roles/:id" element={<RoleEditPage />} />
          <Route path="users/create" element={<CreateUserPage />} />
          <Route path="permissions" element={<PermissionsPage />} />

        </Route>
        

        {/* Rollerle İlgili Sayfalar */}
        {/* equiredPermission="edit_page" izin kontrolü */}
        <Route
          path="/roles/create"
          element={
            <ProtectedRoute requiredPermission="edit_page">
              <CreateRolePage />
            </ProtectedRoute>
          }
        />



        {/* Profil Sayfası */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Paneli */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredPermission="edit_page">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Yetkisiz Sayfa */}
        <Route path="/unauthorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
}
