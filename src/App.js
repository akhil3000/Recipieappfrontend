
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import {Auth} from './pages/Auth';
import Createrecipe from './pages/Createrecipe';
import Saverecipie from './pages/Saverecipie';
import Navbar from './components/Navbar';
function App() {
  return (
   <div className="App">
     <Router>
      <Navbar/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/auth" element={<Auth/>}/>
         <Route path="/createrecipie" element={<Createrecipe/>}/>
         <Route path="/saverecipie" element={<Saverecipie/>}/>
       </Routes>
     </Router>

   </div>
  );
}

export default App;
