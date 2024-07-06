import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReferEarn from './components/ReferEarn';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<ReferEarn />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
