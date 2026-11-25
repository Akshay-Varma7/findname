import './App.css'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { useState } from "react";
import { Context } from "./Context.jsx";
import HabbitLayout from './HabbitLayout.jsx';
import Signup from "./Signup.jsx";

function App() {
  console.log("!st");//yes and twice
  //
  const [habbits,setHabbits] = useState([]);
  const [habbit,setHabbit] = useState(null);

  const value = {
    habbits,setHabbits,
    habbit,setHabbit
  }

  return (
    <BrowserRouter>
      <Context.Provider value={value}>
        <Routes>
          <Route path="/" element={<HabbitLayout/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App;
