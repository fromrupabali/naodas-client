import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../../components/Navigations/MainNavigation';
import Spinner from '../../components/Modals/SpinnerModal';

import { serverUrl } from '../../utils/utils';

import styled from 'styled-components';

const SignInContainer = styled.div`
    width: 100%;
    height: auto;
    padding-top: 7%;
`
const SignInMain = styled.div`
    width: 27%;
    height: auto;
    background: white;
    margin-left: 34%;
    border-radius: 5px;
    text-align: center;
    padding: 2%;
`
const Title = styled.h2`
    margin: 0;
    padding: 0;
    color: #b92d47;
    padding: 20px 0;
`
const InputBox = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
`
const Input = styled.input`
    width: 95%;
    padding: 15px 2.5%;
    font-size: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    outline: none;

`
const Button = styled.button`
    padding: 15px 50px;
    font-weight: bold;
    font-size: 15px;
    background: #b92d47;
    color: white;
    cursor: pointer;
    border-radius: 25px;
    border: none;
    outline: none; 
    &:hover{
        background: #d8435e; 
    }
`
const SwitchLink = styled(Link)`
    color: black;
    &:hover{
        color: #d8435e; 
    }
`

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [message, setMessage] = useState('');

    const signInHandler = async() =>{
        try {
            if(email && password){
                setMessage('');
                setSpinner(true);
                const user = await axios.post(
                    serverUrl,
                    {
                        query:`
                           query{
                               signIn(email:"${email}", password:"${password}"){
                                   success
                                   token
                                   userId
                                   error_message
                                   success
                               }
                           }
                        `
                    }
  
                );
                if(user.data.data.signIn.success){
                    localStorage.setItem('TOKEN', user.data.data.signIn.token);
                    localStorage.setItem('userId', user.data.data.signIn.userId);
                    setRedirect(<Redirect to="/"/>);
                }else{
                    setMessage(user.data.data.signIn.error_message);
                }
                setSpinner(false);
                console.log(user);
                }
        } catch (error) {
            throw error;
        }
    };
    return(
        <div>
            {redirect}
            <Spinner show={spinner}>
                Hi
            </Spinner>
            <Navigation />
            <SignInContainer>
                <SignInMain>
                    <Title>Sign in</Title>
                    <InputBox>
                       <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                    </InputBox>
                    <InputBox>
                       <Input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                    </InputBox>
                    <p style={{color:"red"}}>{message}</p>
                    <InputBox>
                       <Button onClick={signInHandler}>Sign in</Button>
                    </InputBox>
                    <InputBox>
                        <SwitchLink to="/forgot-password">Forgotten password ?</SwitchLink>
                    </InputBox>
                    <InputBox>
                      <p>Haven't Account ? <SwitchLink to="/signup">Create New Account</SwitchLink></p>
                    </InputBox>
                  
                </SignInMain>
            </SignInContainer>
        </div>
    )
};

export default SignIn;