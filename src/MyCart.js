import { useState, useEffect } from 'react';

import OrderList from './OrderList';

const MyCart = () => {
    const AbortCont = new AbortController();

    const [empty, setEmpty] = useState(null)
    const [allOrders, setAllOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        // setTimeout(() => {
        fetch('http://localhost:8000/orders')
        .then((res) => {
            if (!res.ok) {
                throw Error('Resource Not Found');
            }
            return res.json();
        })
        .then((data) => {
            if (data.length == 0) {
                setEmpty('Your cart is empty.')
            }
            setAllOrders(data);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            if (err.message === 'AbortError') {
                console.log('Fetch Aborted');
            }
            else {
                setIsLoading(false);
                setError(err.message);
            }
        })
        // }, 1000)
        
        return () => AbortCont.abort();
    }, []);

    return (
        <div className="my-cart page-section">
            <h1>My Cart &#128722;</h1>
            { allOrders && <OrderList title="My Orders:" allOrders={ allOrders }/> }
            { isLoading && <p>Loading...</p>}
            { error && <p>{ error }</p>}
            { empty && <p>{ empty }</p>}
        </div>

    );
}
 
export default MyCart;