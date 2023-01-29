import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateOrder = () => {
    const [coneOrCup, setConeOrCup] = useState('Cone');
    const [flavor, setFlavor] = useState('Vanilla');
    const [syrup, setSyrup] = useState('None');
    const [scoops, setScoops] = useState(0);

    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculating cost
        let cost = 0;
        cost = cost + (coneOrCup === 'Cone' ? 2.50 : 2.00);
        cost = scoops * 1.00
        cost = cost + (syrup === 'None' ? 0 : 0.50);
        const cost_string = cost.toFixed(2); // Decimal number printed in 2 precisions

        // Calculating tax
        let tax = cost * 0.05;
        const tax_string = tax.toFixed(2);

        // Total cost (Plus tax)
        let total_cost = cost + tax;
        const total_cost_string = total_cost.toFixed(2);


        const order = { coneOrCup, flavor, syrup, scoops, cost_string, tax_string, total_cost_string};
        


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

                <label>Number of Scoops</label>
                <input required type="number" min="1" max="5" onChange={(e) => setScoops(e.target.value)}></input>
                {/* <label>Toppings</label>
                <div className="toppings-checkboxes">
                    <input type="checkbox" name=""/>
                    <label for="send_newsletter"></label>

                    <input type="checkbox" name="send_newsletter"/>
                    <label for="send_newsletter">Send me newsletter</label>
                </div> */}

                <label>Syrup</label>
                <select value={ syrup } className="syrup-select" onChange={(e) => setSyrup(e.target.value)}>
                    <option value="None">None</option>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Caramel">Caramel</option>
                </select>
                
                { !isPending && <button>Submit</button> }
                { isPending && <button disabled>Pending...</button>}
            </form>

            {/* <p>{ flavor }, { coneOrCup }, { syrup } { scoops }</p> */}
        </div>
    );
}
 
export default CreateOrder;