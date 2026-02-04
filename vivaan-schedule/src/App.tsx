import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MathsPractice } from './pages/MathsPractice';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maths" element={<MathsPractice />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
