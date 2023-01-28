import Home from './Home';
import Navbar from './Navbar';
import CreateOrder from './CreateOrder';
import MyCart from './MyCart';
import NotFound from './404';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="app">
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create-order">
            <CreateOrder />
          </Route>
          <Route exact path="/mycart">
            <MyCart />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
    </div>
    </Router>

    // <div className="app">
    //   <Navbar/>
    // </div>
  );
}

export default App;
