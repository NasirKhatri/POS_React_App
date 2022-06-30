import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Sale from "./sale";
import Check from "./check";
import AddCustomer from "./addCustomer";
import AddItem from "./addItem";
import AddCategory from "./addCategory";
import { useReducer, useEffect } from 'react';
import invoiceUpdateReducer from "./store/reducers";

export const StoreContext = React.createContext();

async function get_customers() {
  if (!sessionStorage.customers) {
    const response = await fetch("Customers");
    const responseData = await response.json();
    sessionStorage.setItem("customers", JSON.stringify(responseData));
  }
  else {
  }
}

async function get_categories() {
  if (!sessionStorage.categories) {
    const response = await fetch("Categories");
    const responseData = await response.json();
    sessionStorage.setItem("categories", JSON.stringify(responseData));
    console.log(responseData);
  }
  else {

  }
}

const all_invoice_details = {
  invoice1_details: [],
  invoice2_details: [],
  invoice3_details: [],
}

function App() {

  useEffect(() => {
    get_customers();
    get_categories();
  })

  /*const invoice1 = [];
  const invoice2 = [];
  const invoice3 = [];*/



  const [invoice, dispatch] = useReducer(invoiceUpdateReducer, all_invoice_details);

  /*const [invoice1_details, dispatchInvoice1] = useReducer(invoiceUpdateReducer, invoice1);
  const [invoice2_details, dispatchInvoice2] = useReducer(invoiceUpdateReducer, invoice2);
  const [invoice3_details, dispatchInvoice3] = useReducer(invoiceUpdateReducer, invoice3);*/

  return (
    <StoreContext.Provider value={{ invoices: invoice, dispatchInvoice: dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sale" element={<Sale />} />
          <Route path="/Add_Customer" element={<AddCustomer />} />
          <Route path="/Add_Item" element={<AddItem />} />
          <Route path="/Add_Category" element={<AddCategory />} />
          <Route path="/Check" element={<Check />} />
        </Routes>
    </StoreContext.Provider>
  );
}

export default App;
