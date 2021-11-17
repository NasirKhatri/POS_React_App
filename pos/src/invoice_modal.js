import { useRef, useState } from "react";
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const Invoice_modal = (props) => {
    const [discount_type, setDiscount_type] = useState("Percentage");
    const [total_discount, settotal_Discount] = useState(0);
    const [received_amount, setReceived_amount] = useState(0);
    const itemDetails = [];

    const customerID = useRef(0);
    const date = useRef(0);
    const modeofpayment = useRef("");
    const amountreceived = useRef(0);
    const balance = useRef(0);

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
    let customers = JSON.parse(sessionStorage.customers);

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

    let amount_receivable;
    if (discount_type === "Percentage") {
        amount_receivable = Math.round(total - total * total_discount / 100);
    }
    else {
        amount_receivable = total - total_discount;
    }
    const handleClose = () => {
        setDiscount_type("Percentage");
        settotal_Discount(0);
        setReceived_amount(0);
        props.setShow(false);
    }
    //const handleShow = () => props.setShow(true);

    async function postPayment(itemDetails) {
        let sale = {
            CustomerID: Number(customerID.current.value),
            Date: date.current.value,
            NoOfProducts: no_of_products,
            NoOfItemsSold: no_of_items_sold,
            GrossPrice: gross_price,
            LineItemDiscount: discount,
            Total: total,
            DiscountType: discount_type,
            AddDiscRateValue: Number(total_discount),
            ModeOfPayment: modeofpayment.current.value,
            AmountReceived: Number(amountreceived.current.value),
            Balance: Number(balance.current.value)
        }
        const data = JSON.stringify({
            orderlines: itemDetails,
            salesummary: sale
        });

        const response = await fetch('Sale', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        console.log(response);
    }

    return (
        <>
            <Modal show={props.show} centered size="lg" backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridCustomer">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control ref={customerID} type="text" list="customers" required />
                                <datalist id="customers">
                                    {
                                        customers.map(customer => {
                                            return <option value={customer.CustomerID}>{`${customer.CustomerFirstName} ${customer.CustomerLastName}`}</option>
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control ref={date} type="date" required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNOP">
                                <Form.Label>No of Products</Form.Label>
                                <Form.Control value={no_of_products} type="number" readOnly required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridNOI">
                                <Form.Label>No of Items</Form.Label>
                                <Form.Control value={no_of_items_sold} type="number" readOnly required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridGP">
                                <Form.Label>Gross Price</Form.Label>
                                <Form.Control value={gross_price} type="number" readOnly required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLID">
                                <Form.Label>Line Item Discount</Form.Label>
                                <Form.Control value={discount} type="number" readOnly required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridT">
                                <Form.Label>Total</Form.Label>
                                <Form.Control value={total} type="number" readOnly required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDT">
                                <Form.Label>Discount Type</Form.Label>
                                <Form.Select value={discount_type} onChange={(e) => setDiscount_type(e.target.value)} required>
                                    <option>Percentage</option>
                                    <option>Fixed Amount</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridADR">
                                <Form.Label>Additional Discount Rate / Value</Form.Label>
                                <Form.Control type="number" defaultValue={total_discount} onChange={(e) => settotal_Discount(e.target.value)} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAR">
                                <Form.Label>Amount Receivable</Form.Label>
                                <Form.Control type="number" value={amount_receivable} readOnly required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridMOP">
                                <Form.Label>Mode Of Payment</Form.Label>
                                <Form.Select ref={modeofpayment} defaultValue="Cash" required>
                                    <option>Cash</option>
                                    <option>Credit Card</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAR">
                                <Form.Label>Amount Received</Form.Label>
                                <Form.Control ref={amountreceived} onChange={(e) => setReceived_amount(e.target.value)} type="number" required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridB">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control ref={balance} value={amount_receivable - received_amount} readOnly required />
                            </Form.Group>
                        </Row>
                        <Button type="submit" variant="primary" onClick={() => postPayment(itemDetails)}>
                            Payment Received
                        </Button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default Invoice_modal;