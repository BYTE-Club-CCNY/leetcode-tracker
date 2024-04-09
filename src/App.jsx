import * as React from 'react';
import { Router } from 'react-chrome-extension-router'; 
import Landing from './pages/landing';

const App = () => {
  return (
    <Router>
      <Landing />
    </Router>
  );
};

export default App;