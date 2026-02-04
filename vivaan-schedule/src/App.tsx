import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MathsPractice } from './pages/MathsPractice';
import { EnglishPractice } from './pages/EnglishPractice';
import { MathsScavengerHunt } from './pages/MathsScavengerHunt';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maths" element={<MathsPractice />} />
        <Route path="/maths/treasure-hunt" element={<MathsScavengerHunt />} />
        <Route path="/english" element={<EnglishPractice />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
