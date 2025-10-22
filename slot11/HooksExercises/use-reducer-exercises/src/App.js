import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import QuestionBank from './components/QuestionBank';
import QuizReducer from './components/QuizReducer';
import SignUpForm from './components/SignUpForm';
import { ToastProvider } from './components/ToastComponent';

function App() {
  return (
    <ToastProvider>
      <div>
        <CounterComponent />
        <LightSwitch />
        <SignUpForm />
        <LoginForm />
        <QuestionBank />
        <QuizReducer />
      </div>
    </ToastProvider>
  );
}

export default App;
