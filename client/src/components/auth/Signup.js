import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext';
import {Redirect} from 'react-router-dom';
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const { user, setUser } = useContext(UserContext);
    const handleSubmit = async e => {
        e.preventDefault();
        setEmailError('')
        setNameError('')
        setPasswordError('')
        console.log(name, email, password)
        try {
            // const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = 'http://localhost:5000/signup';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization,Origin,Accept'
                }),
                mode: 'cors',
                credentials: 'include'

            });
            const data = await res.json();

            if (data.errors) {
                setEmailError(data.errors.email)
                setNameError(data.errors.name)
                setPasswordError(data.errors.password)
            }
            if (data.user) {
                setUser(data.user)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    if(user){
        return <Redirect to='/' />
    }
    return (
        <>
            <h1>Signup</h1>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="first_name" type="text" className="validate"
                                value={name} onChange={e => setName(e.target.value)} />
                            <label htmlFor="Name">Name</label>
                            <div className="name error red-text">{nameError} </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <div className="email error red-text">{emailError} </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"
                                value={password} onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <div className="password error red-text">{passwordError}</div>
                        </div>
                    </div>
                    <button className="btn">Signup</button>
                </form>
            </div>
        </>
    )
}

export default Signup
