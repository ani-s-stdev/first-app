import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import Login from './login'
import ProductList from './ProductList'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route path="/home/:id" component={ProductList}/>
                </div>
            </Router>
        )
    }
}

export default App;
