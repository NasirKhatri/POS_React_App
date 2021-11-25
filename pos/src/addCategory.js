import React from "react";
import NavigationBar from "./navbar";
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useRef } from "react";

const AddCategory = () => {
    const categoryName = useRef("");
    const categoryImage = useRef(0);
    return (
        <div>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Add Category</h3>
            </div>
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()} className="text-alignment-left">
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridcategoryName">
                            <Form.Label>Category</Form.Label>
                            <Form.Control ref={categoryName} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control ref={categoryImage} type="file" required />
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant="primary">
                        Add Category
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;