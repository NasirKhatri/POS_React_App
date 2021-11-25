import React from "react";
import NavigationBar from "./navbar";
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useRef } from "react";

const AddCustomer = () => {
    const firstName = useRef("");
    const lastName = useRef("");
    const DOB = useRef("");
    const contactNumber = useRef("");
    const email = useRef("");
    const address = useRef("");
    const town = useRef("");
    const city = useRef("");
    return (
        <div>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Add Customer</h3>
            </div>
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()} className="text-alignment-left">
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control ref={firstName} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control ref={lastName} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridDOB">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control ref={DOB} type="date" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control ref={contactNumber} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={email} type="email" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control ref={address} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridTown">
                            <Form.Label>Town</Form.Label>
                            <Form.Control ref={town} type="email" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control ref={city} type="text" required />
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