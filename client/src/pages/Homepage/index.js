import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container/index';
import Navbar from '../../components/Navbar/index';


import './homepage.css';

function Homepage() {
    return (
        <div>
            <Navbar />
            <Container>
                <h1 className='animate__animated animate__slideInDown'>Change of Seasons</h1>
                
                <div className='card animate__animated animate__slideInDown'>
                    <div className='card-body'>
                        <img src='./images/buddy.png' alt='placeholder' className='homeImg'></img>

                        <div className='btnRow'>
                            <Link className='btn btn-primary' to='/Signup'>Sign up</Link>
                            <Link className='btn btn-primary' to='/Signin'>Sign in</Link>
                        </div>
                    </div>
               </div>
            </Container>
        </div>
    )
}

export default Homepage;