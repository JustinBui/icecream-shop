import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateOrder = () => {
    const [coneOrCup, setConeOrCup] = useState('Cone');
    const [flavor, setFlavor] = useState('Vanilla');
    const [syrup, setSyrup] = useState('Strawberry');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = { coneOrCup, flavor, syrup };
        setIsPending(true);

        // Make POST request
        // To run server: npx json-server --watch data/data.json --port 8000
        fetch('http://localhost:8000/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/JSON'},
            body: JSON.stringify(order)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log('Order placed succesfully!');
            history.push('/mycart');
            setIsPending(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <div className="order page-section">
            <h1>ORDER &#128640;</h1>
            <form onSubmit={ handleSubmit }>
                <label>Cone or Cup</label>
                <select value={ coneOrCup } className="cone-cup-select" onChange={(e) => setConeOrCup(e.target.value)}>
                    <option value="Cone">Cone</option>
                    <option value="Cup">Cup</option>
                </select>

                <label>Flavor</label>
                <select value={ flavor } className="flavor-select" onChange={(e) => setFlavor(e.target.value)}>
                    <option value="Vanilla">Vanilla</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Mint-chocolate-chip">Mint Chocolate Chip</option>
                    <option value="Cookies-n-cream">Cookies n' Cream</option>
                </select>

                {/* <label>Toppings</label>
                <div className="toppings-checkboxes">
                    <input type="checkbox" name=""/>
                    <label for="send_newsletter"></label>

                    <input type="checkbox" name="send_newsletter"/>
                    <label for="send_newsletter">Send me newsletter</label>
                </div> */}

                <label>Syrup</label>
                <select value={ syrup } className="syrup-select" onChange={(e) => setSyrup(e.target.value)}>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Caramel">Caramel</option>
                </select>
                
                { !isPending && <button>Submit</button> }
                { isPending && <button disabled>Pending...</button>}
            </form>

            {/* <p>{ flavor }, { coneOrCup }, { syrup }</p> */}
        </div>
    );
}
 
export default CreateOrder;