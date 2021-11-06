import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./navbar";

const Sale = () => {
    const [data, setData] = useState([{ ItemCategoryID: " ", ItemCategoryDescription: " ", ImageSource: " " }]);
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await fetch("Sale");
        const responseData = await response.json();
        setData(responseData);
    }

    return (
        <div>
            <NavigationBar />
            <h1>POS</h1>
            <div className="d-flex flex-Wrap">
            <div className="Order_details">

            </div>
            <div className="d-flex flex-wrap justify-content-around Categories">

                {
                    data.map((element) => {
                        return (
                            <Link to={`/Sale/${element.ItemCategoryDescription}`}>
                            <div className="card" id={element.ItemCategoryID} style={{ width: '150px', height: '200px' }}>
                                <img className="card-img-top" src={element.ImageSource} alt="Card image" />
                                <div className="card-body">
                                    <h5 className="card-title">{element.ItemCategoryDescription}</h5>
                                </div>
                            </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
        </div>
    )

}
export default Sale;