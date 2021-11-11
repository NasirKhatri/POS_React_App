//Currently this file has no use in the prject

/*
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavigationBar from "./navbar";
import Keypad from "./keypad";
import OrderLines from "./orderlines";

const Category = () => {
    const category = useParams().Category;
    const url = `/Sale/${category}`;
    const [data, setData] = useState([{
        ItemNumber: " ",
        ItemDescription: " ",
        ItemImageSource: " ",
        ItemCategoryID: " ",
        Price: " "
    }]);
    const [orderlines, setorderlines] = useState([]); 

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
    }

    function addOrder(ItemDetails) {
        //console.log(ItemDetails);
        setorderlines([...orderlines, ItemDetails]);
    }

    return (
        <div>
            <NavigationBar />
            <h1>POS</h1>
            <div className="d-flex flex-Wrap">
                <div className="Order_details">
                    <OrderLines itemDetails={orderlines} />
                    <Keypad />
                </div>
                <div className="d-flex flex-wrap justify-content-around Categories">
                    {
                        data.map((element) => {
                            return (
                                <div className="card" id={element.ItemNumber} style={{ width: '150px', height: '200px' }}
                                onClick = {() => addOrder(element)}>
                                    <img className="card-img-top" src={element.ItemImageSource} alt="Card image" />
                                    <div className="card-body">
                                        <h6 className="card-title">{element.ItemDescription}</h6>
                                        <p>Rs: {element.Price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Category;*/