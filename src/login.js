import React, {Component} from 'react';
import {get, post} from './helpers';
import config from './config'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        };
    }

    updateStorage (user_id) {
        if (this.state.remember) localStorage.setItem('user_id', user_id);
        else sessionStorage.setItem('user_id', user_id);
    }

    handleClick() {
        const {username, password} = this.state;
        const users_url = config.back+'users';
        get(`${users_url}?username=${username}`)
            .then(result=>{
                let condition = result[0] && password === result[0].password;
                if (condition) {
                    this.updateStorage(result[0].id);
                    this.props.history.push(`home/${result[0].id}`);
                }
                else if (condition === undefined) {
                    const data = {
                        'username': username,
                        'password': password,
                    };
                    post(users_url, data)
                        .then(result=>{
                            this.updateStorage(result.id);
                            this.props.history.push(`home/${result.id}`);
                        })
                        .catch(error=>console.log(error));
                }
                else alert('Password not correct!');
            })
            .catch(error=>console.log(error));
    }

    handleCheck () {
        this.setState({
            remember: !this.state.remember,
        });
    }

    render() {
        const user_id = localStorage.getItem('user_id') || sessionStorage.getItem('user_id');
        if (user_id) {
            this.props.history.push(`home/${user_id}`)
        }
        const {username, password} = this.state;
        const isEnabled = username.length > 0 && password.length > 0;
        return (
            <div>
                <label>username</label>
                <input type="text" onChange={(event)=>this.setState({username:event.target.value})}/><br/>
                <label>password</label>
                <input type="text" onChange={(event)=>this.setState({password:event.target.value})}/><br/>
                <button disabled={!isEnabled} onClick={()=>this.handleClick()}>submit</button><br/>
                <input type="checkbox" onChange={()=>this.handleCheck()}/>
                <label>remember</label>
            </div>
        )
    }
}

export default Login;
