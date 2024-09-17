import './Login.css';
import Landingpage from "./Pages/Landingpage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
 import SignupPage from './Pages/Signup';



const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landingpage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
