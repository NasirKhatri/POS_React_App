import React, { useState, useEffect, useContext } from "react";
//import { Link } from "react-router-dom";
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
    const [invoice1_details, setinvoice1_details] = useState([]);
    const [invoice2_details, setinvoice2_details] = useState([]);
    const [invoice3_details, setinvoice3_details] = useState([]);
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

    /*function addOrder(ItemDetails) {
        if(active_invoice === 1) {
            const itemIndex = invoice1_details.findIndex((item) => item.ItemNumber === ItemDetails.ItemNumber);
            if(itemIndex === -1) {
                ItemDetails.Qty = 1;
                ItemDetails = Object.assign({}, ItemDetails);
                setinvoice1_details([...invoice1_details, ItemDetails]);
            }
            else {
                setinvoice1_details((previousstate) => {
                    const tempstate = [...previousstate];
                    const obj = tempstate[itemIndex];
                    obj.Qty++;
                    return tempstate;
                })
            }
        }
        else if(active_invoice === 2) {
            const itemIndex = invoice2_details.findIndex((item) => item.ItemNumber === ItemDetails.ItemNumber);
            if(itemIndex === -1) {
                ItemDetails.Qty = 1;
                ItemDetails = Object.assign({}, ItemDetails);
                setinvoice2_details([...invoice2_details, ItemDetails]);
            }
            else {
                setinvoice2_details((previousstate) => {
                    const tempstate = [...previousstate];
                    const obj = tempstate[itemIndex];
                    obj.Qty++;
                    return tempstate;
            })
        }
    }
        else {
            const itemIndex = invoice3_details.findIndex((item) => item.ItemNumber === ItemDetails.ItemNumber);
            if(itemIndex === -1) {
                ItemDetails.Qty = 1;
                ItemDetails = Object.assign({}, ItemDetails);
                setinvoice3_details([...invoice3_details, ItemDetails]);
            }
            else {
                setinvoice3_details((previousstate) => {
                    const tempstate = [...previousstate];
                    const obj = tempstate[itemIndex];
                    obj.Qty++;
                    return tempstate;
            })
            }
        }
    }*/

    if (type === "Categories") {
        return (
            <div>
                <NavigationBar />
                <div className="d-flex flex-Wrap">
                    <div className="Order_details">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-item nav-link active" onClick={(e) => setInvoice(e, 1)} id="invoice1-tab">Invoice 1</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 2)} id="invoice2-tab">Invoice 2</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 3)} id="invoice3-tab">Invoice 3</button>
                            </div>
                        </nav>
                        <OrderLines active_invoice={active_invoice} show={show} setShow={setShow}/>
                        <Keypad
                        active_invoice={active_invoice} 
                        invoice1_details={invoice1_details} 
                        invoice2_details={invoice2_details} 
                        invoice3_details={invoice3_details}
                        setinvoice1_details={setinvoice1_details} 
                        setinvoice2_details={setinvoice2_details} 
                        setinvoice3_details={setinvoice3_details} 
                        show={show}
                        setShow={setShow}/>
                    </div>
                    <div className="Categories">
                        <h4><span className="home-link" onClick={() => setType("Categories")}>Home</span></h4>
                        <hr />
                        <div className="d-flex flex-wrap justify-content-around">
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
                    </div>
                    <Invoice_modal
                    active_invoice={active_invoice} 
                    invoice1_details={invoice1_details} 
                    invoice2_details={invoice2_details} 
                    invoice3_details={invoice3_details}
                    setinvoice1_details={setinvoice1_details} 
                    setinvoice2_details={setinvoice2_details} 
                    setinvoice3_details={setinvoice3_details} 
                    show={show}
                    setShow={setShow}
                    />
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <NavigationBar />
                <div className="d-flex flex-Wrap">
                    <div className="Order_details">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-item nav-link active" onClick={(e) => setInvoice(e, 1)} id="invoice1-tab">Invoice 1</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 2)} id="invoice2-tab">Invoice 2</button>
                                <button className="nav-item nav-link" onClick={(e) => setInvoice(e, 3)} id="invoice3-tab">Invoice 3</button>
                            </div>
                        </nav>
                        <OrderLines active_invoice={active_invoice} show={show} setShow={setShow}/>
                        <Keypad
                        active_invoice={active_invoice} 
                        invoice1_details={invoice1_details} 
                        invoice2_details={invoice2_details} 
                        invoice3_details={invoice3_details}
                        setinvoice1_details={setinvoice1_details} 
                        setinvoice2_details={setinvoice2_details} 
                        setinvoice3_details={setinvoice3_details}
                        show={show}
                        setShow={setShow}/>
                    </div>
                    <div className="Categories">
                        <h4><span className="home-link" onClick={() => setType("Categories")}>Home</span><span>  || {type}</span></h4>
                        <hr />
                        <div className="d-flex flex-wrap justify-content-around">
                            {
                                products.map((element) => {
                                    return (
                                        <div className="card" id={element.ItemNumber} style={{ width: '150px', height: '200px' }}
                                            onClick={() => storeData.dispatchInvoice({type: 'increase', ItemNumber: element.ItemNumber, ItemDetails: element, active_invoice: active_invoice})}>
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
                    </div>
                    <Invoice_modal
                    active_invoice={active_invoice} 
                    invoice1_details={invoice1_details} 
                    invoice2_details={invoice2_details} 
                    invoice3_details={invoice3_details}
                    setinvoice1_details={setinvoice1_details} 
                    setinvoice2_details={setinvoice2_details} 
                    setinvoice3_details={setinvoice3_details}
                    show={show}
                    setShow={setShow}
                    />
                </div>
            </div>
        );
    }

}
export default Sale;