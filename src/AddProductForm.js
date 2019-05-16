import React from 'react';

class AddProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {userId} = this.props;
        const {name, price} = this.state;
        this.props.onSubmit({
            'userId': userId,
            'name': name,
            'price': price,
        })
    };

    render() {
        return (
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <input placeholder="product name.."
                       name="name"
                       value={this.state.name}
                       onChange={this.handleChange}/>
                <input placeholder="product price.."
                       name="price"
                       value={this.state.price}
                       onChange={this.handleChange}/>
                <button>Add Product</button>
            </form>
        )
    }
}

export default AddProductForm;
