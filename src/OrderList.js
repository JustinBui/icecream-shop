import { Link } from 'react-router-dom';

const OrderList = ({title, allOrders}) => {
    return (
        <div className="order-list">
            <h3>{ title }</h3>
            {
                allOrders.map((item) => (
                    <div className="icecream-preview" key={ item.id }>
                        <div className="icecream-text">
                            <p><strong>Order ID { item.id }:</strong> { item.flavor } { item.coneOrCup }</p>
                            <p>Syrup: { item.syrup }</p>
                        </div>
                        <button>Delete</button>
                    </div>
                ))
            }
        </div>
    );
}
 
export default OrderList;