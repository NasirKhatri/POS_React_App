import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import NavigationBar from "./navbar";
import Keypad from "./keypad";
import OrderLines from "./orderlines";
import Invoice_modal from "./invoice_modal";
import { StoreContext } from "./App";

const Sale = (props) => {
    const [data, setData] = useState([{ ItemCategoryID: " ", ItemCategoryDescription: " ", ImageSource: " " }]);
    const [products, setProducts] = useState([{
        ItemNumber: " ",
        ItemDescription: " ",
        ItemImageSource: " ",
        ItemCategoryID: " ",
        Price: " "
    }]);
    const [type, setType] = useState("Categories");

    const storeData = useContext(StoreContext);

    //const [orderlines, setorderlines] = useState(invoice1_details);
    const [active_invoice, setactive_invoice] = useState(1);
    const [show, setShow] = useState(false);

    async function getData() {
        if (type === "Categories") {
            const response = await fetch("Sale");
            const responseData = await response.json();
            setData(responseData);
        }
        else {
            const url = `/Sale/${type}`;
            const response = await fetch(url);
            const responseData = await response.json();
            setProducts(responseData);
        }
    }

    useEffect(() => {
        getData();
    }, [type]);



    function setInvoice(e, number) {
        e.target.parentElement.querySelectorAll(".active").forEach(e =>
            e.classList.remove("active"));
        e.target.classList.add('active');
        setactive_invoice(number);
    }

    if(storeData.login) {
        return (
            <div>
                <NavigationBar />
                <div className="d-flex flex-Wrap flex-column-reverse flex-lg-row body">
                    <div className="d-flex flex-column Order_details">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-item nav-link active" onClick={(e) => setInvoice(e, 1)} id="invoice1-tab">Invoice 1</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 2)} id="invoice2-tab">Invoice 2</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 3)} id="invoice3-tab">Invoice 3</button>
                            </div>
                        </nav>
                        <OrderLines active_invoice={active_invoice} show={show} setShow={setShow}/>
                        <Keypad active_invoice={active_invoice} show={show} setShow={setShow} />
                    </div>
                    <div className="Categories">
                        {
                            type === 'Categories' ? 
                            <>
                                <h4><span className="home-link" onClick={() => setType("Categories")}>Home</span></h4>
                                <hr />
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        data.map((element) => {
                                            return (
                                                <div className="card" id={element.ItemCategoryID} style={{ width: '150px', height: '200px' }} onClick={() => setType(element.ItemCategoryDescription)}>
                                                    <img className="card-img-top" src={element.ImageSource} alt="Card" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{element.ItemCategoryDescription}</h5>
                                                    </div>
                                                </div>
                                            )
                                        })
    
                                    }
                                </div>
                            </> : 
                            <>
                                <h4><span className="home-link" onClick={() => setType("Categories")}>Home</span><span>  || {type}</span></h4>
                                <hr />
                                <div className="d-flex flex-wrap justify-content-center">
                                    {
                                        products.map((element) => {
                                            return (
                                                <div className="card" id={element.ItemNumber} style={{ width: '150px', height: '200px' }}
                                                    onClick={() => storeData.dispatchInvoice({ type: 'increase', ItemNumber: element.ItemNumber, ItemDetails: element, active_invoice: active_invoice })}>
                                                    <img className="card-img-top" src={element.ItemImageSource} alt="Card" />
                                                    <div className="card-body">
                                                        <h6 className="card-title">{element.ItemDescription}</h6>
                                                        <p>Rs: {element.Price}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                    <Invoice_modal active_invoice={active_invoice} show={show} setShow={setShow}/>
                </div>
            </div>
    
            )
    }

    else {
        return (<Navigate to="/Login" />);
    }


}
export default Sale;