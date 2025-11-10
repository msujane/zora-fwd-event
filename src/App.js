// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Registration from './pages/registaration';
import Questions from './pages/questions';
import Adminscores from './pages/admin_scores';
import Adminwinner from './pages/admin_winner';
import Feedback from './pages/feedback';
import Score from './pages/score';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/admin_scores" element={<Adminscores />} />
        <Route path="/admin_winner" element={<Adminwinner />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
