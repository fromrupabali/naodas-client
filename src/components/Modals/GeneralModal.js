import React from 'react';


import Backdrop from './Backdrop';

import styled from 'styled-components';


const Menu = styled.div`
    width: 45%;
    height: 83vh;
    position: fixed;
    z-index: 7000;
    box-sizing: border-box;
    top: 56px;
    left: calc(27%);
    background: white;
    border-radius: 5px;
   
    @media(min-width: 1600px){
        width: 12%;
        left: calc(68%);
    }
`

const generalModal = (props) => (
   <div>
     <Backdrop show={props.show} clicked={props.close}/>
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

export default generalModal;