import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Navigate to='/login' />} />
          <Route path={'/login'} element={<Login />} />
          <Route
            path={'/home'}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
