import React from "react";
import NavigationBar from "./navbar";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import {Bar, defaults} from 'react-chartjs-2';

defaults.plugins.legend.position = 'bottom';


const Home = () => {
    const [DashboardData, setDashboardData] = useState({
        todaySales: 0,
        thisWeekSales: 0,
        thisMonthSales: 0,
        thisYearSales: 0,
        monthwiseSales: []
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
            <Card>
                <Card.Header><h3>Sales</h3></Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div className="p-2 bg-light flex-fill card-border">
                            <Card.Body>
                                <Card.Title>Today</Card.Title>
                                <Card.Text>
                                    PKR {DashboardData.todaySales}
                                </Card.Text>
                            </Card.Body>
                        </div>
                        <div className="p-2 bg-light flex-fill card-border">
                            <Card.Body>
                                <Card.Title>This Week</Card.Title>
                                <Card.Text>
                                PKR {DashboardData.thisWeekSales}
                                </Card.Text>
                            </Card.Body></div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 bg-light flex-fill card-border">
                            <Card.Body>
                                <Card.Title>This Month</Card.Title>
                                <Card.Text>
                                PKR {DashboardData.thisMonthSales}
                                </Card.Text>
                            </Card.Body></div>
                        <div className="p-2 bg-light flex-fill card-border">
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
    // npm install --save react-chartjs-2 chart.js
    /*const BarChart = () => {
        let data = DashboardData.monthwiseSales;
        let labels = data.map((row) => row.Months);
        let sales = data.map((row) => row.MonthlySales);
        console.log(labels);
        console.log(sales);
        return(
            <div>
                <Bar
                    data = {{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: '# of Votes',
                            yAxisID: 'A',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
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
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 3
                        },
                    {
                        label: 'Quantity',
                        yAxisID: 'B',
                        data: [100, 50, 125, 130, 50, 75],
                        backgroundColor: 'lightblue',
                        borderColor: 'orange',
                        borderWidth: 3
                    }]
                    }}
                    height = {400}
                    width = {600}
                    options = {{
                        maintainAspectRatio: false,
                        scales: {
                            A: {
                                type: 'linear',
                                position: 'left',
                            },
                            B: {
                                type: 'linear',
                                position: 'right',
                            }
                        }
                    }}
                />
            </div>
        )
    }*/

    const BarChart = () => {
        let data = DashboardData.monthwiseSales;
        let labels = data.map((row) => row.Months);
        let sales = data.map((row) => row.MonthlySales);
        //console.log(labels);
        //console.log(sales);
        return(
            <div>
                <Bar
                    data = {{
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
                    height = {400}
                    width = {600}
                    options = {{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        )
    }


    return (
        <>
            <NavigationBar />
            <div className="container">
                <SalesBoard />
                <BarChart/>
            </div>
        </>
    );
}

export default Home;