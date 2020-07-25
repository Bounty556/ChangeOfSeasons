import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container/index';
import Card from '../../components/Card/index';

import './signUp.css';

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        secondPassword: ''
    }

    submitFunc = event => {
        event.preventDefault();
    }

    inputFunc = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Container className='animate__animated animate__zoomIn'>

                <Card id='signUpCard'>
                    <h2 className='signUpTitle'>Sign Up for Change of Seasons!</h2>

                    <hr />

                    <form>
                        {/* Enter username */}
                        <div className='form-group'>
                            <label htmlFor='userInputUsername'>Username</label>
                            <input
                                type='username'
                                name='username'
                                id='username'
                                className='form-control'
                                placeholder='Enter a username'
                                onChange={this.inputFunc}
                                value={this.state.username}
                            />
                        </div>

                        {/* Enter Email */}
                        <div className='form-group'>
                            <label htmlFor='userInputEmail'>Email address</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                className='form-control'
                                placeholder='Enter your email'
                                onChange={this.inputFunc}
                                value={this.state.email}
                            />
                        </div>

                        {/* Enter Password */}
                        <div className='form-group'>
                            <label htmlFor='userInputPassword'>Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                className='form-control'
                                placeholder='Enter a password'
                                onChange={this.inputFunc}
                                value={this.state.password}
                            />
                        </div>

                        {/* Re-enter Password */}
                        <div className='form-group'>
                            <label htmlFor='userInputPassword'>Re-enter Password</label>
                            <input
                                type='password'
                                name='secondPassword'
                                className='form-control'
                                id='secondPassword'
                                placeholder='Re-enter your password'
                                onChange={this.inputFunc}
                                value={this.state.secondPassword}
                            />
                        </div>
                    </form>
                </Card>

                <button type='submit' className='btn btn-primary animate__animated animate__bounceIn' id='signUpButton' onSubmit={this.submitFunc}>
                    Sign Up!
                </button>

                <p id='alreadyHave' className='animate__animated animate__fadeIn animate__delay-2s'>Already have an account? <Link id='clickHere' to='/Signin'>Click here to sign in!</Link></p>
            </Container>
        )
    }
}

export default SignUp;