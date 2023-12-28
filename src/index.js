import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AuthContexProvider from './Pages/AuthContexProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <AuthContexProvider>
      <HashRouter>
        <Routes>
          <Route path='/*' element={<App />} />

        </Routes>
      </HashRouter>
      </AuthContexProvider>
  
  </React.StrictMode>
);


