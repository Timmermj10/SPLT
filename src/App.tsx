import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './css/App.css';
import StartCheck from './startCheck';
import AdjustItem from './adjustItem';
import NewCheck from './newCheck';
import CheckSummary from './checkSummary';
import FinalCheckSummary from './finalCheckSummary';
import { Item } from './types';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>SPLT</h1>
      <button className="start-check" onClick={() => navigate('/new-check')}>Start check</button>
      <button className="join-check">Join check</button>
    </div>
  );
}

function App() {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-check" element={<NewCheck />} />
        <Route path="/start-check" element={<StartCheck items={items} setItems={setItems} />} />
        <Route path="/start-check/adjust/:index" element={<AdjustItem items={items} setItems={setItems} />} />
        <Route path="/start-check/summary" element={<CheckSummary items={items}/>} />
        <Route path="/start-check/finalSummary" element={<FinalCheckSummary items={items}/>} />
      </Routes>
    </Router>
  );
}

export default App;