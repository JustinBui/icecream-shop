import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Ice Cream Shop &#127848;</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-order">Order</Link>
                <Link to="/mycart">My Cart</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;