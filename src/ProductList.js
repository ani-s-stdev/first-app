import React from 'react';
import config from './config';
import {get, post} from './helpers';
import AddProductForm from './AddProductForm'

class Product extends React.Component {
    render() {
        const {prod} = this.props;
        return (
            <tr>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
            </tr>
        )
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const user_products_url = `${config.back}users/${id}/products`;
        get(user_products_url)
            .then(products=>{
                this.setState({products: products})
            })
            .catch(error=>console.log(error));
    }

    addProduct = product => {
        const products_url = `${config.back}products`;
        post(products_url, product)
            .then(result => {

                this.setState({
                    products: [result, ...this.state.products],
                })
            })
            .catch(error=>console.log(error))
    };

    render() {
        const {id} = this.props.match.params;
        const {products} = this.state;
        return (
            <div>
                <h1>USER ID: {id} </h1>
                <AddProductForm userId={id} onSubmit={this.addProduct}/><br/>
                { products.length > 0 ? (
                    <table>
                            <tbody>
                            <tr><th>Name</th><th>Price</th></tr
                            >{products.map(product=><Product prod={product} key={product.id}/>)}</tbody>
                        </table>
                ) : (
                    <h2>No products yet.</h2>
                )}

            </div>
        )
    }
}

export default ProductList;
