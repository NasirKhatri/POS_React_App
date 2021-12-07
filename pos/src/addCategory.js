import React, { useState } from "react";
import NavigationBar from "./navbar";
import { Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const AddCategory = () => {
    const [categoryName, setcategoryName] = useState()
    const [categoryImage, setcategoryImage] = useState("");
    //const [uploadProgress, setUploadProgress] = useState();

    async function reset_categories() {
        sessionStorage.removeItem("categories");
        if(!sessionStorage.categories) {
          const response = await fetch("Categories");
          const responseData = await response.json();
          sessionStorage.setItem("categories", JSON.stringify(responseData));
          console.log(responseData);
        }
        else {
    
        }
      }

    async function PostCategory(e) {
        e.preventDefault();

        //checking file type and size
        categoryImage.type.slice(0, 5) != "image" ? alert("Only Images are acceptable") :
            categoryImage.size > 1024 * 1024 ? alert("Oversized Image File") :
                console.log("Continue");
        //console.log(categoryImage);
        //console.log(categoryName);

        let data = new FormData();
        data.append('name', categoryName);
        data.append('image', categoryImage, categoryImage.name);

        axios.post('AddCategory', data, {
            onUploadProgress: ProgressEvent => {
                console.log("Upload Progress: " + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
            }
        }
        )
            .then(response => {
                console.log(response);
                reset_categories();
                //sessionStorage.setItem("categories", response);
                alert("Category Have Been Added");
                window.location.reload(false);
            });

    }
    return (
        <div>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Add Category</h3>
            </div>
            <div className="container">
                <form onSubmit={(e) => PostCategory(e)} id="AddCategory" className="text-alignment-left">
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridcategoryName">
                            <Form.Label>Category</Form.Label>
                            <Form.Control onChange={(e) => setcategoryName(e.target.value)} type="text" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control onChange={(e) => setcategoryImage(e.target.files[0])} name="categoryImage" type="file" accept="image/*" required />
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