import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import NavigationBar from "./navbar";
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { StoreContext } from "./App";

const AddItem = () => {

    // Replate UseRef with usestate and add onChange event on each input feild
    ////////////Start from here
    const storeData = useContext(StoreContext);
    const [itemName, setitemName] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [discount, setdiscount] = useState(0);
    const [itemImage, setitemImage] = useState("");

    let categories = JSON.parse(sessionStorage.categories);

    async function PostItem(e) {
        e.preventDefault();
        //checking file type and size
        itemImage.type.slice(0, 5) !== "image" ? alert("Only Images are acceptable") :
            itemImage.size > 1024 * 1024 ? alert("Oversized Image File") :
                console.log("Continue");

        let data = new FormData();
        data.append('name', itemName);
        data.append('category', category);
        data.append('price', price);
        data.append('discount', discount);
        data.append('itemImage', itemImage);
        //console.log(data);
        axios.post('AddItem', data, {
            onUploadProgress: ProgressEvent => {
                console.log("Upload Progress: " + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
            }
        }
        )
            .then(response => {
                alert("Item Have Been Added");
                window.location.reload(false);
            });

    }

    if(storeData.login) {
        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <h3>Add Item</h3>
                </div>
                <div className="container">
                    <form onSubmit={(e) => PostItem(e)} className="text-alignment-left">
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridItemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control onChange={(e) => setitemName(e.target.value)} type="text" required />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Category</Form.Label>
                                <Form.Control onChange={(e) => setcategory(e.target.value)} list="categories" type="text" required />
                                <datalist id="categories">
                                    {
                                        categories.map(category => {
                                            return <option value={category.ItemCategoryID}>{`${category.ItemCategoryDescription}`}</option>
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={(e) => setprice(e.target.value)} type="number" required />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Discount (%)</Form.Label>
                                <Form.Control onChange={(e) => setdiscount(e.target.value)} type="number" required />
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control onChange={(e) => setitemImage(e.target.files[0])} type="file" required />
                        </Form.Group>
                        <br />
                        <Button type="submit" variant="primary">
                            Add Item
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

    else {
        return (<Navigate to="/Login" />);
    }

}

export default AddItem;