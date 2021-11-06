import React, { useEffect, useState } from "react";

const Check = () => {
    const [data, setData] = useState();
    useEffect(() => {
        getData();
    });

    async function getData() {
        const response = await fetch("http://localhost:4000/Check", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        });
        setData(response);
    }


    return(
        <h1>{data}</h1>
    );
}

export default Check;