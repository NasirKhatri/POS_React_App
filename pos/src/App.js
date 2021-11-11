import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./home";
import Sale from "./sale";
//import Category from "./category";
import Check from "./check";

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sale" element={<Sale />}/>
        {/*<Route path="/Sale/:Category" element={<Category />}/>*/}
        <Route path="/Check" element={<Check />}/>
      </Routes>
    </div>
  );
}

export default App;
