import React, { useState } from "react";
import NavigationBar from "./navbar";
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
//import { useRef } from "react";
import axios from "axios";

const AddCustomer = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [DOB, setDOB] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [town, settown] = useState("");
    const [city, setcity] = useState("");

    async function reset_customers() {
            sessionStorage.removeItem("Customers");
          const response = await fetch("Customers");
          const responseData = await response.json();
          sessionStorage.setItem("customers", JSON.stringify(responseData));
          window.location.reload(false);
          alert("Customer Have Been Added");
          //console.log(responseData);
        }

    async function PostCustomer(e) {
        e.preventDefault();
/*         let data = new FormData();
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('DOB', DOB);
        data.append('contactNumber', contactNumber);
        data.append('email', email);
        data.append('address', address);
        data.append('town', town);
        data.append('city', city); */

        let data = {
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            contactNumber: contactNumber,
            email: email,
            address: address,
            town: town,
            city: city
        }

        data = JSON.stringify(data);

        const response = await fetch('AddCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        if(response.status === 200) {
            reset_customers();
 
        }

/*         axios.post('AddCustomer', data)
            .then(response => {
                alert("Customer Have Been Added");
                window.location.reload(false);
            });
 */
/*         const response = await fetch('AddCustomer', {
            method: 'POST',
            headers: {
                
            },
            body: data
        });
        alert("Customer Have Been Added"); */

    }

    return (
        <div>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Add Customer</h3>
            </div>
            <div className="container">
                <form onSubmit={(e) => PostCustomer(e)} id="new_customer" className="text-alignment-left">
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={(e) => setfirstName(e.target.value)} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={(e) => setlastName(e.target.value)} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridDOB">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control onChange={(e) => setDOB(e.target.value)} type="date" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control onChange={(e) => setcontactNumber(e.target.value)} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={(e) => setemail(e.target.value)} type="email" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => setaddress(e.target.value)} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridTown">
                            <Form.Label>Town</Form.Label>
                            <Form.Control onChange={(e) => settown(e.target.value)} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={(e) => setcity(e.target.value)} type="text" required />
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant="primary">
                        Add Customer
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer;