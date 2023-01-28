import { useState, useEffect } from 'react';

import OrderList from './OrderList';

const MyCart = () => {
    const [allOrders, setAllOrders] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/orders')
        .then((res) => {
            if (!res.ok) {
                throw Error('Resource Not Found');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setAllOrders(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className="my-cart page-section">
            <h1>My Cart &#128722;</h1>
            { allOrders && <OrderList title="My Orders:" allOrders={ allOrders }/> }
        </div>

    );
}
 
export default MyCart;