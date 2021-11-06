import React, {useEffect, useState} from "react";
import {Link, useLocation, Outlet} from "react-router-dom";
//import { use } from "../../pos-backend/routes/handlers";

export function Home() {
    return(
        <>
        <Link to="Sale">
            <div className="box">
                <h3>POS</h3>
            </div>
        </Link>

        <Link to="Total_conf_orders">
            <div className="box">
                <h3>Total Confirmed Orders</h3>
            </div>
        </Link>

        <Link to="Instore_conf_orders">
            <div className="box">
                <h3>Instore Confimed Orders</h3>
            </div>
        </Link>

        <Link to="Online_conf_orders">
            <div className="box">
                <h3>Online Confirmed Orders</h3>
            </div>
        </Link>

        <Link to="Sales_history">
            <div className="box">
                <h3>Sales History</h3>
            </div>
        </Link>
        
        <Link to="Add_customer">        
            <div className="box">
                <h3>Add Customer</h3>
            </div>
        </Link>
        </>
    );
}

export function Sale() {
    return(
        <div>
            <h1>POS</h1>
            <div className="Order_details">

            </div>
            <div className="Categories">
                <div className="box">Burgers</div>
                <div className="box">Broasts</div>
                <div className="box">Sandwitches</div>
                <div className="box">Fries</div>
            </div>
        </div>
    );
}

export function Burgers() {
    return(
        <div>
            <Sale />
        </div>
    )
}

export function Broasts() {
    return(
        <div>
            <Sale />
        </div>
    )
}

export function Fries() {
    return(
        <div>
            <Sale />
        </div>
    )
}

export function Sandwitches() {
    return(
        <div>
            <Sale />
        </div>
    )
}

export function TotalConfOrders() {
    useEffect(() => {
        fetchItems()
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/Total_conf_orders');
        const items = await data.json();
        setItems(items);
        document.getElementsByClassName("section")[0].innerHTML = `<p>${items[0]["name"]}</p><p>${items[0]["msg"]}</p>`;
    }
    return(
        <div>
            <h1>Total Confirmed Orders</h1>
            <div className="section"></div>
        </div>
    );
}


export function InstoreConfOrders() {
    return(
        <div>
            <h1>In Store Confirmed Orders</h1>
        </div>
    );
}

export function OnlineConfOrders() {
    return(
        <div>
            <h1>Online Confirmed Orders</h1>
        </div>
    );
}

export function SalesHistory() {
    return(
        <div>
            <h1>Sales History</h1>
        </div>
    );
}

export function AddCustomer() {
    return(
        <div>
            <h1>Add Customer</h1>
        </div>
    );
}

export function Whoops404() {
    return(
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
}