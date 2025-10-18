import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import QuestionBank from './components/QuestionBank';
import QuizReducer from './components/QuizReducer';
function App() {
  return (
    <div >
     <CounterComponent />
     <LightSwitch />
     <LoginForm />
     <QuestionBank />
     <QuizReducer />
    </div>
  );
}

export default App;
