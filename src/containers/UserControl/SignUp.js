import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../../components/Navigations/MainNavigation';



import Spinner from '../../components/Modals/SpinnerModal';

import { serverUrl } from '../../utils/utils';
import styled from 'styled-components';

const SignUpContainer = styled.div`
    width: 100%;
    height: auto;
    
`
const SignUpMain = styled.div`
    width: 35%;
    height: auto;
    background: white;
    margin-left: 31%;
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
function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [message, setMessage] = useState('');

    const signUpHandler = async() =>{
        try {
            if(email && password){
                setMessage('');
                setSpinner(true);
                const user = await axios.post(
                    serverUrl,
                    {
                        query:`
                           mutation{
                               signUp(email:"${email}", password:"${password}", userName:"${userName}"){
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
                if(user.data.data.signUp.success){
                    localStorage.setItem('TOKEN', user.data.data.signUp.token);
                    localStorage.setItem('userId', user.data.data.signUp.userId);
                    setRedirect(<Redirect to="/"/>);
                }else{
                    setMessage(user.data.data.signUp.error_message);
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
            <Spinner show={spinner}/>
            {redirect}
            
            <SignUpContainer>
                <SignUpMain>
                    <Title>Sign up</Title>
                    <InputBox>
                       <Input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} placeholder="User name"/>
                    </InputBox>
                    <InputBox>
                       <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                    </InputBox>
                    <InputBox>
                       <Input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                    </InputBox>
                    <p style={{color:"red"}}>{message}</p>
                    <InputBox>
                       <Button onClick={signUpHandler}>Sign up</Button>
                    </InputBox>
                    <InputBox>
                      <p> Already Have an Account ? <SwitchLink to="/signin">Sign in</SwitchLink></p>
                    </InputBox>
                </SignUpMain>
            </SignUpContainer>
        </div>
    )
};

export default SignUp;