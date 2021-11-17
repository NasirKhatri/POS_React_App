//import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import {AiFillMinusCircle} from "react-icons/ai";
import {AiFillPlusCircle} from "react-icons/ai";


const OrderLines = (props) => {
    function clearInvoice() {
        if (props.active_invoice === 1) {
            props.setinvoice1_details([]);
        }
        else if (props.active_invoice === 2) {
            props.setinvoice2_details([]);
        }
        else {
            props.setinvoice3_details([]);
        }
    }

    const itemDetails = [];
    if (props.active_invoice === 1) {
        props.invoice1_details.forEach(element => {
            itemDetails.push(element);
        });
    }
    else if (props.active_invoice === 2) {
        props.invoice2_details.forEach(element => {
            itemDetails.push(element);
        });
    }
    else {
        props.invoice3_details.forEach(element => {
            itemDetails.push(element);
        });
    }
    let no_of_products = itemDetails.length;
    let no_of_items_sold = 0;
    let gross_price = 0;
    let discount = 0;
    itemDetails.forEach((item) => {
        no_of_items_sold += item.Qty;
        gross_price += item.Qty * item.Price;
        discount += Math.round(item.Price * item.Qty * item.Discount / 100);
    })
    let total = gross_price - discount;

    function remove_orderline(ItemNumber) {
        let ItemIndex;
        let tempArray;
        switch (props.active_invoice) {
            case 1:
                {
                    ItemIndex = props.invoice1_details.findIndex((item) => item.ItemNumber === ItemNumber);
                    tempArray = props.invoice1_details;
                    tempArray.splice(ItemIndex, 1);
                    tempArray = Object.assign([], tempArray);
                    props.setinvoice1_details(tempArray);
                    break;
                }
            case 2:
                {
                    ItemIndex = props.invoice2_details.findIndex((item) => item.ItemNumber === ItemNumber);
                    tempArray = props.invoice2_details;
                    tempArray.splice(ItemIndex, 1);
                    tempArray = Object.assign([], tempArray);
                    props.setinvoice2_details(tempArray);
                    break;
                }
            case 3:
                {
                    ItemIndex = props.invoice3_details.findIndex((item) => item.ItemNumber === ItemNumber);
                    tempArray = props.invoice3_details;
                    tempArray.splice(ItemIndex, 1);
                    tempArray = Object.assign([], tempArray);
                    props.setinvoice3_details(tempArray);
                    break;
                }
        }
    }
    
    function increase_qty(ItemNumber) {
        let ItemIndex;
        let tempArray;
        switch (props.active_invoice) {
            case 1: {
                ItemIndex = props.invoice1_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice1_details;
                tempArray[ItemIndex].Qty++;
                tempArray = Object.assign([], tempArray);
                props.setinvoice1_details(tempArray);
                break;
            }
            case 2: {
                ItemIndex = props.invoice2_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice2_details;
                tempArray[ItemIndex].Qty++;
                tempArray = Object.assign([], tempArray);
                props.setinvoice2_details(tempArray);
                break;

            }
            case 3: {
                ItemIndex = props.invoice3_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice3_details;
                tempArray[ItemIndex].Qty++;
                tempArray = Object.assign([], tempArray);
                props.setinvoice3_details(tempArray);
                break;
            }
        }
    }

    function decrease_qty(ItemNumber) {
        let ItemIndex;
        let tempArray;
        switch (props.active_invoice) {
            case 1: {
                ItemIndex = props.invoice1_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice1_details;
                if(tempArray[ItemIndex].Qty > 1) {
                    tempArray[ItemIndex].Qty--;
                    tempArray = Object.assign([], tempArray);
                    props.setinvoice1_details(tempArray);
                }
                break;
            }
            case 2: {
                ItemIndex = props.invoice2_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice2_details;
                if(tempArray[ItemIndex].Qty > 1) {
                tempArray[ItemIndex].Qty--;
                tempArray = Object.assign([], tempArray);
                props.setinvoice2_details(tempArray);
                }
                break;
            }
            case 3: {
                ItemIndex = props.invoice3_details.findIndex((item) => item.ItemNumber === ItemNumber);
                tempArray = props.invoice3_details;
                if(tempArray[ItemIndex].Qty > 1) {
                tempArray[ItemIndex].Qty--;
                tempArray = Object.assign([], tempArray);
                props.setinvoice3_details(tempArray);
                }
                break;
            }
        }
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
                                        <AiFillMinusCircle onClick={() => decrease_qty(item.ItemNumber)} className="inc-dec col"/>
                                        <input type="number" className="form-control col-7" value={item.Qty} />
                                        <AiFillPlusCircle onClick={() => increase_qty(item.ItemNumber)} className="inc-dec col"/>
                                    </div>
                                    <div className="col">
                                        <input type="number" className="form-control" value={item.Discount} />
                                    </div>
                                    <div className="col">
                                        <input type="number" readOnly className="form-control" value={item.Price * item.Qty * (1 - item.Discount / 100)} />
                                    </div>
                                    <div className="col-0.7">
                                        <FiTrash2 onClick={() => remove_orderline(item.ItemNumber)} />
                                    </div>
                                </div>
                            </form>
                        )
                    })
                }
            </div>
            <div className="d-flex bd-highlight invoice-details">
                <div className="p-2 flex-fill bd-highlight">
                    <button type="button" onClick={clearInvoice} className="btn btn-dark">Clear</button>
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