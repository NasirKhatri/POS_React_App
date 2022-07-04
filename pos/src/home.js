import React from "react";
import { Navigate } from 'react-router-dom';
import NavigationBar from "./navbar";
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useContext } from "react";
import { Bar, defaults } from 'react-chartjs-2';
import { StoreContext } from "./App";

defaults.plugins.legend.position = 'bottom';


const Home = () => {
    const storeData = useContext(StoreContext);
    const [DashboardData, setDashboardData] = useState({
        todaySales: 0,
        thisWeekSales: 0,
        thisMonthSales: 0,
        thisYearSales: 0,
        monthwiseSales: [],
        top_customer_last_month: {
            Sales: 0,
            CustomerID: "",
            CustomerFirstName: ""
        },
        top_customer_this_month: {
            Sales: 0,
            CustomerID: "",
            CustomerFirstName: ""
        },
        top_product_last_month: {
            TotalSales: 0,
            ItemNumber: "",
            ItemDescription: ""
        },
        top_product_this_month: {
            TotalSales: 0,
            ItemNumber: "",
            ItemDescription: ""
        }
    })
    async function getData() {
        //console.log("Request Sent");
        const response = await fetch("DashboardData");
        const responseData = await response.json();
        //console.log(responseData);
        setDashboardData(responseData);
    }

    useEffect(() => {
        getData();
    }, []);

    const SalesBoard = () => {
        return (
            <Card className="dashboard-card">
                <Card.Header><h3>Sales</h3></Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div className="p-2 bg-info text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>Today</Card.Title>
                                <Card.Text>
                                    PKR {DashboardData.todaySales}
                                </Card.Text>
                            </Card.Body>
                        </div>
                        <div className="p-2 bg-secondary text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>This Week</Card.Title>
                                <Card.Text>
                                    PKR {DashboardData.thisWeekSales}
                                </Card.Text>
                            </Card.Body></div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 bg-primary text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>This Month</Card.Title>
                                <Card.Text>
                                    PKR {DashboardData.thisMonthSales}
                                </Card.Text>
                            </Card.Body></div>
                        <div className="p-2 bg-success text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>This Year</Card.Title>
                                <Card.Text>
                                    PKR {DashboardData.thisYearSales}
                                </Card.Text>
                            </Card.Body></div>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    const CustomerOfthePeriod = () => {
        return (
            <Card className="dashboard-card">
                <Card.Header><h3>Top Customers</h3></Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div className="p-2 bg-warning text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>Last Month</Card.Title>
                                <Card.Text>
                                    Name: {DashboardData.top_customer_last_month.CustomerFirstName}<br />
                                    ID: {DashboardData.top_customer_last_month.CustomerID}<br />
                                    PKR {DashboardData.top_customer_last_month.Sales}
                                </Card.Text>
                            </Card.Body>
                        </div>
                        <div className="p-2 bg-danger text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>This Month</Card.Title>
                                <Card.Text>
                                    Name: {DashboardData.top_customer_this_month.CustomerFirstName}<br />
                                    ID: {DashboardData.top_customer_this_month.CustomerID}<br />
                                    PKR {DashboardData.top_customer_this_month.Sales}
                                </Card.Text>
                            </Card.Body></div>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    const TopProducts = () => {
        return (
            <Card className="dashboard-card">
                <Card.Header><h3>Top Products</h3></Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div className="p-2 bg-info text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>Last Month</Card.Title>
                                <Card.Text>
                                    Name: {DashboardData.top_product_last_month.ItemDescription}<br />
                                    ID: {DashboardData.top_product_last_month.ItemNumber}<br />
                                    PKR {DashboardData.top_product_last_month.TotalSales}
                                </Card.Text>
                            </Card.Body>
                        </div>
                        <div className="p-2 bg-primary text-white flex-even card-border">
                            <Card.Body>
                                <Card.Title>This Month</Card.Title>
                                <Card.Text>
                                    Name: {DashboardData.top_product_this_month.ItemDescription}<br />
                                    ID: {DashboardData.top_product_this_month.ItemNumber}<br />
                                    PKR {DashboardData.top_product_this_month.TotalSales}
                                </Card.Text>
                            </Card.Body></div>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    const BarChart = () => {
        let data = DashboardData.monthwiseSales;
        let labels = data.map((row) => row.Months);
        let sales = data.map((row) => row.MonthlySales);
        return (
            <div className="borderedDiv">
                <Bar
                    data={{
                        labels: labels,
                        datasets: [{
                            label: 'Total Sales',
                            data: sales,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 3
                        },
                        ]
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        )
    }

    if(storeData.login) {
        return (
            <>
                <NavigationBar />
                <div className="container d-flex flex-column body justify-content-center">
                    <div className="d-flex flex-wrap">
                        <SalesBoard />
                        <CustomerOfthePeriod />
                        <TopProducts />
                    </div>
                    <BarChart />
                </div>
            </>
        );
    }
    
    else {
        return (<Navigate to="/Login" />);
    }

}

export default Home;