import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import View from "./pages/View/AllView";
import Login from './pages/Login/Login';
import AssignedView from './pages/View/AssignedView';
import AssignMarks from './pages/View/AssignMarks';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<View />} />
        <Route path='/login' element={<Login />} />
        <Route path='/assignedStudents' element={<AssignedView />} />
        <Route path='/assignMarks' element={<AssignMarks />} />
      </Routes>
    </div>
  );
}

export default App;
