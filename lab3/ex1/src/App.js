import 'bootstrap/dist/css/bootstrap.min.css';
import './wizard-ui.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import FooterPage from './pages/FooterPage';

function App() {
  return (
    <Router>
      <div className="bg-dark text-light min-vh-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}
export default App;
