/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Login = ({jumpToPage}) => {
    return (
        <Page background={'lightblue'}>
            Login
            <button onClick={() => jumpToPage(1)}>Login</button>
        </Page>
    )
}

export default Login;