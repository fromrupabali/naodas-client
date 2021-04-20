import React from 'react';

import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Item = styled(NavLink)`
  display: block;
  text-align: center;
  margin: 0 0 10px 0;
  padding: 10px 0;
  border: 1px solid #ccc;
  text-decoration: none;
  color: black;
  border-radius: 5px;
  font-weight: 500;
  &:hover{
     color: #BF2D47;
 }
  
`

const NavItem = (props)=>{
    return<Item activeStyle={{color:"#BF2D47", background: "white"}} exact to={props.to}>{props.name}</Item>
};

export default NavItem;
