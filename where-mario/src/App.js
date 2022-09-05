import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import StartPage from './components/StartPage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
