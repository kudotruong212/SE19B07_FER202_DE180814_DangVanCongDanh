import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Banner from './components/Banner';
import Navbar from './components/Navar';

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
    </div>
  );
}

export default App;
