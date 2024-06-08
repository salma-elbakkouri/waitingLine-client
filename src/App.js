// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Queue from './components/Queue'; // Example additional component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </Router>
  );
};

export default App;
