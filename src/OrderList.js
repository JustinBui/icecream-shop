// import { Link, useHistory } from 'react-router-dom';

const OrderList = ({title, allOrders}) => {
    // const history = useHistory();

    const handleDelete = (e) => {
        const id = e.target.getAttribute('data-id');
        console.log('Order ID ' + id + ' clicked.');

        fetch('http://localhost:8000/orders/' + id, {
            method: 'DELETE'
        })
        .then((res) => {
            res.json();
            window.location.reload(false); // Page refresh
        })
        .catch((err) => {
            console.log('Oops. Failed to Delete.');
        })
    }
    
    return (
        <div className="order-list">
            <h3>{ title }</h3>
            {
                allOrders.map((item) => (
                    <div className="icecream-preview" key={ item.id }>
                        <div className="icecream-text">
                            <p><strong>Order ID { item.id }:</strong> { item.flavor } { item.coneOrCup } ({item.scoops} {item.scoops > 1 ? 'Scoops' : 'Scoop'})</p>
                            <p>Syrup: { item.syrup }</p>
                        </div>
                        
                        {/* <button onClick={ handleDelete }><a href={`http://localhost:8000/orders/${item.id}`}>Delete</a></button> */}
                        <button data-id={ item.id } onClick={ handleDelete }>Delete</button>
                    </div>
                ))
            }
        </div>
    );
}
 
export default OrderList;