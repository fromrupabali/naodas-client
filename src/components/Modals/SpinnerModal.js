import React from 'react';


import Backdrop from './Backdrop';

import styled from 'styled-components';


const Spinner = styled.div`
    width: 10%;
    height: 10%;
    position: fixed;
    z-index: 7000;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 35%;
    left: calc(45%);
`
const Loader = styled.div`
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #4285F4;
    border-right: 10px solid #34A853;
    border-bottom: 10px solid #E94235;
    width: 50px;
    height: 50px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
`
const spinnerModal = (props) => (
   <div>
     <Backdrop show={props.show} />
     <Spinner
     style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'

    }}
     >
       <Loader />
    </Spinner>
   </div>
);

export default spinnerModal;