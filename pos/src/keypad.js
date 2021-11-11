const Keypad = () => {
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
                    <td className="col-1" rowSpan={3}>Payment</td>
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