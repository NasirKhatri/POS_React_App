import { useContext } from "react";
import { StoreContext } from "./App";

const Keypad = (props) => {
    const storeData = useContext(StoreContext);
    function check_if_orderline() {
        switch(props.active_invoice) {
            case 1: {
                if(storeData.invoices.invoice1_details.length === 0) {
                    alert("Please add Items");
                }
                else {
                    props.setShow(true);
                }
                break;
            }
            case 2: {
                if(storeData.invoices.invoice2_details.length === 0) {
                    alert("Please add Items");
                }
                else {
                    props.setShow(true);
                }
                break;
            }
            case 3: {
                if(storeData.invoicesinvoice3_details.length === 0) {
                    alert("Please add Items");
                }
                else {
                    props.setShow(true);
                }
                break;
            }
            default: {
                console.log("Breaking without doing anything");
                break;
            }
        }
    }

    return(
        <div className="keypad">
            <table className="table table-bordered">
                <tr>
                    <td className="col-1 keypad-button" onClick={() => storeData.dispatchInvoice({ type: 'clear', active_invoice: props.active_invoice })}>C</td>
                    <td className="col-1 keypad-button">1</td>
                    <td className="col-1 keypad-button">2</td>
                    <td className="col-1 keypad-button">3</td>
                    <td className="col-1 keypad-button" rowSpan={2}>Erase Icon</td>
                </tr>
                <tr>
                    <td className="col-1 keypad-button" onClick={check_if_orderline} rowSpan={3}>Payment</td>
                    <td className="col-1 keypad-button">4</td>
                    <td className="col-1 keypad-button">5</td>
                    <td className="col-1 keypad-button">6</td>
                </tr>
                <tr>
                    <td className="col-1 keypad-button">7</td>
                    <td className="col-1 keypad-button">8</td>
                    <td className="col-1 keypad-button">9</td>
                    <td className="col-1 keypad-button" rowSpan={2}>Enter</td>
                </tr>
                <tr>
                    <td className="col-1 keypad-button">.</td>
                    <td className="col-1 keypad-button">0</td>
                    <td className="col-1 keypad-button">+/-</td>
                </tr>

            </table>
        </div>
    )
}

export default Keypad;