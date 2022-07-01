//import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { useContext } from "react";
import { StoreContext } from "./App";


const OrderLines = (props) => {
    const storeData = useContext(StoreContext);

    let itemDetails = [];
    if (props.active_invoice === 1) {
        itemDetails = storeData.invoices.invoice1_details;
    }
    else if (props.active_invoice === 2) {
        itemDetails = storeData.invoices.invoice2_details;
    }
    else {
        itemDetails = storeData.invoices.invoice3_details;;
    }

    let no_of_products = itemDetails.length;
    let no_of_items_sold = 0;
    let gross_price = 0;
    let discount = 0;
    let total = 0;
    if(itemDetails.length > 0) {
        itemDetails.forEach((item) => {
            no_of_items_sold += item.Qty;
            gross_price += item.Qty * item.Price;
            discount += Math.round(item.Price * item.Qty * item.Discount / 100);
        })
        total = gross_price - discount;
    }
    
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="col">
                        <input type="text" readOnly className="form-control-plaintext" value="Item" />
                    </div>
                    <div className="col">
                        <input type="text" readOnly className="form-control-plaintext" value="Price" />
                    </div>
                    <div className="col">
                        <input type="text" readOnly className="form-control-plaintext" value="Quantity" />
                    </div>
                    <div className="col">
                        <input type="text" readOnly className="form-control-plaintext" value="Discount" />
                    </div>
                    <div className="col">
                        <input type="text" readOnly className="form-control-plaintext" value="Total" />
                    </div>
                </div>
                <hr />
            </form>
            <div className="orderlines-section">
                {
                    itemDetails.map((item) => {
                        return (
                            <form>
                                <div className="form-row">
                                    <div className="col">
                                        <input type="text" readOnly className="form-control-plaintext" value={item.ItemDescription} />
                                    </div>
                                    <div className="col">
                                        <input type="number" className="form-control" value={item.Price} />
                                    </div>
                                    <div className="form-row col-3">
                                        <AiFillMinusCircle onClick={() => storeData.dispatchInvoice({ type: 'decrease', ItemNumber: item.ItemNumber, active_invoice: props.active_invoice })} className="inc-dec col" />
                                        <input type="number" className="form-control col-7" value={item.Qty} />
                                        <AiFillPlusCircle onClick={() => storeData.dispatchInvoice({ type: 'increase', ItemNumber: item.ItemNumber, active_invoice: props.active_invoice })} className="inc-dec col" />
                                    </div>
                                    <div className="col">
                                        <input type="number" className="form-control" value={item.Discount} />
                                    </div>
                                    <div className="col">
                                        <input type="number" readOnly className="form-control" value={Math.round(item.Price * item.Qty * (1 - item.Discount / 100))} />
                                    </div>
                                    <div className="col-0.7">
                                        <FiTrash2 onClick={() => storeData.dispatchInvoice({ type: 'delete', ItemNumber: item.ItemNumber, active_invoice: props.active_invoice })} />
                                    </div>
                                </div>
                            </form>
                        )
                    })
                }
            </div>
            
            <div className="d-flex bd-highlight invoice-details">
                <div className="p-2 flex-fill bd-highlight">
                    <button type="button" onClick={() => storeData.dispatchInvoice({ type: 'clear', active_invoice: props.active_invoice })} className="btn btn-dark">Clear</button>
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <p>No of Products: {no_of_products}</p>
                    <p>No of Items Sold: {no_of_items_sold}</p>
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <p>Gross: {gross_price}</p>
                    <p>Tax:</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderLines;