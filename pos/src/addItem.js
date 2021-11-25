import React from "react";
import NavigationBar from "./navbar";
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useRef } from "react";

const AddItem = () => {
    const itemName = useRef("");
    const category = useRef("");
    const price = useRef("");
    const discount = useRef(0);
    const itemImage = useRef("");
    return (
        <div>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Add Item</h3>
            </div>
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()} className="text-alignment-left">
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control ref={itemName} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control ref={category} type="text" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control ref={price} type="number" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Discount (%)</Form.Label>
                            <Form.Control ref={discount} type="number" required />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col}>
                        <Form.Label>Image</Form.Label>
                        <Form.Control ref={itemImage} type="file" required />
                    </Form.Group>
                    <br/>
                    <Button type="submit" variant="primary">
                        Add Item
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddItem;