import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';
import './styles/App.css';

function App() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    // </BrowserRouter>
  );
}

export default App;
