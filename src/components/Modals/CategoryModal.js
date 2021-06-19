import React from 'react';


import Backdrop from './Backdrop';

import styled from 'styled-components';


const Menu = styled.div`
    width: 20%;
    height: 60vh;
    position: fixed;
    z-index: 7000;
    box-sizing: border-box;
    padding: 20px 10px;
    top: 56px;
    left: calc(60%);
    background: white;
    border-radius: 5px;
    overflow-y: scroll;
    @media(min-width: 1600px){
        width: 12%;
        left: calc(68%);
    }
`

const menuModal = (props) => (
   <div>
     <Backdrop show={props.show} clicked={props.clicked}/>
     <Menu
     style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'

    }}
     >
        {props.children}
    </Menu>
   </div>
);

export default menuModal;