import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Sale from "./sale";
//import Category from "./category";
import Check from "./check";
import AddCustomer from "./addCustomer";
import AddItem from "./addItem";
import AddCategory from "./addCategory";

function App() {
  async function get_customers() {
    if(!sessionStorage.customers) {
      const response = await fetch("Customers");
      const responseData = await response.json();
      sessionStorage.setItem("customers", JSON.stringify(responseData));
      //console.log(responseData);
    }
    else {;
      //console.log(JSON.parse(sessionStorage.customers));
    }
  }



  get_customers();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sale" element={<Sale />} />
        {/*<Route path="/Sale/:Category" element={<Category />}/>*/}
        <Route path="/Add_Customer" element={<AddCustomer/>}/>
        <Route path="/Add_Item" element={<AddItem/>}/>
        <Route path="/Add_Category" element={<AddCategory/>}/>
        <Route path="/Check" element={<Check />} />
      </Routes>
    </div>
  );
}

export default App;
