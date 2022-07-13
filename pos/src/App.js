import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Sale from "./sale";
import Check from "./check";
import AddCustomer from "./addCustomer";
import AddItem from "./addItem";
import AddCategory from "./addCategory";
import Login from './login';
import Signup from './signup';
import { useReducer, useEffect } from 'react';
import { invoiceUpdateReducer, loginReducer } from "./store/reducers";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'


export const StoreContext = React.createContext();
const queryClient = new QueryClient();



const initialLoginStatus = {
  Token: "",
  FirstName: "",
  LastName: "",
  Email: "",
  BrandName: "",
  RegisteredOn: "",
  Auth: false
}

let loginStatus = localStorage.getItem('user');
//console.log(loginStatus);

if(loginStatus) {
  loginStatus = JSON.parse(localStorage.getItem('user'))
}

else {
  loginStatus = initialLoginStatus;
}

//const loginStatus = JSON.parse(localStorage.getItem('user')) || initialLoginStatus;

const all_invoice_details = {
  invoice1_details: [],
  invoice2_details: [],
  invoice3_details: [],
}

function App() {


  const [invoice, dispatch] = useReducer(invoiceUpdateReducer, all_invoice_details);
  const [login, setLogin] = useReducer(loginReducer, loginStatus);

  return (
    <StoreContext.Provider value={{ invoices: invoice, dispatchInvoice: dispatch, login: login, dispatchLogin: setLogin }}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path="/Sale" element={<Sale />} />
          <Route path="/Add_Customer" element={<AddCustomer />} />
          <Route path="/Add_Item" element={<AddItem />} />
          <Route path="/Add_Category" element={<AddCategory />} />
          <Route path="/Check" element={<Check />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreContext.Provider>
  );
}

export default App;
