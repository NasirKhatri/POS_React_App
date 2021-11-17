const Keypad = (props) => {
    function check_if_orderline() {
        switch(props.active_invoice) {
            case 1: {
                if(props.invoice1_details.length === 0) {
                    alert("Please add Items");
                }
                else {
                    props.setShow(true);
                }
                break;
            }
            case 2: {
                if(props.invoice2_details.length === 0) {
                    alert("Please add Items");
                }
                else {
                    props.setShow(true);
                }
                break;
            }
            case 3: {
                if(props.invoice3_details.length === 0) {
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
                    <td className="col-1">C</td>
                    <td className="col-1">1</td>
                    <td className="col-1">2</td>
                    <td className="col-1">3</td>
                    <td className="col-1" rowSpan={2}>Erase Icon</td>
                </tr>
                <tr>
                    <td className="col-1" onClick={check_if_orderline} rowSpan={3}>Payment</td>
                    <td className="col-1">4</td>
                    <td className="col-1">5</td>
                    <td className="col-1">6</td>
                </tr>
                <tr>
                    <td className="col-1">7</td>
                    <td className="col-1">8</td>
                    <td className="col-1">9</td>
                    <td className="col-1" rowSpan={2}>Enter</td>
                </tr>
                <tr>
                    <td className="col-1">.</td>
                    <td className="col-1">0</td>
                    <td className="col-1">+/-</td>
                </tr>

            </table>
        </div>
    )
}

export default Keypad;