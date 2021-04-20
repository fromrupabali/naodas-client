import React, { useState } from 'react';

import { NavLink, Link } from 'react-router-dom';

// import Avatar from '../../assets/avatar.png';
import Virat from '../../assets/virat.png';
import Message from '../../assets/message.png';
import Notification from '../../assets/bell.png';

import MenuModal from '../Modals/Menu';

import styled from 'styled-components';

const NavContainer = styled.div`
    text-align: center;
    width: 100%;
    height: 60px;
    background: white;
    position: fixed;
    border-bottom: 1px solid #eee;
`
const NavMain = styled.div`
    width: 80%;
    height: 100%;
    margin-left: 10%;
`
const NavLeft = styled.div`
    width: 50%;
    height: 100%;
    float: left;
`
const LogoContainer = styled.div`
    width: 22%;
    height: 100%;
    float: left;
`
const Logo = styled.h1`
    margin: 0;
    padding: 9% 0;
    color: #b92d47;
    font-size: 1.5em;
    text-align: left;
`
const SearchContainer = styled.div`
    width: 77%;
    height: 100%;
    float: right;
`
const Input = styled.input`
    width: 96%;
    padding: 12px 2%;
    border: 1px solid #eee;
    margin-top: 8px;
    outline: none;
    font-size: 15px;
    border-radius: 5px;
`
const NavRight = styled.div`
    width: 47%;
    height: auto;
    padding-top: 0.1%;
    float: right;
`
const Button = styled.button`
    float: right;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1em;
    outline: none;
    border: none;
    background: none;
    margin: 0 0 0 2%;
    padding: 8px 0 8px 5px;
    height: 55px;
    &:hover{
        color: #b92d47;
    }
    cursor: pointer;
`
const NavItem = styled(NavLink)`
    text-decoration: none;
    display: block;
    color: black;
    &:hover{
        color: #b92d47;
    }
`
const ButtonBox = styled.div`
    width: 40px;
    height: 40px;
    background: #F0F2F5;
    border-radius: 100%;
    text-align: center;
`
const ButtonImage = styled.img`
    width: 100%;
    height: 100%;
`
const ButtonImage2 = styled.img`
    width: 25px;
    height: 25px;
    margin-top: 7px;
`
const MenuItem = styled.button`
    width: 90%;
    height: 40px;
    border: none;
    margin: 5px 0;
    text-align: left;
    border-radius: 5px;
    font-weight: 500;
    font-size: 1em;
    outline: none;
    cursor: pointer;
    background: none;
    &:hover{
        background: #EFEFEF;
        color: red;
    }
`
const MenuLink = styled(Link)`
    text-decoration: none;
    display: block;
    color: black;
    padding: 10px 0;
    &:hover{
        color: #B92D47;
    }
    
`
function MainNavigation(){
    const [menu, setMenu] = useState(false);
    let navRight, publishLink;
    localStorage.TOKEN ? publishLink = "/publish-post" : publishLink = "/signin";
    if(localStorage.TOKEN){
        navRight =  <NavRight>
                        <Button>
                            <ButtonBox>
                                <ButtonImage onClick={()=>{setMenu(!menu)}} src={Virat} alt="user"/>
                            </ButtonBox>
                        </Button>
                        <Button>
                           <ButtonBox>
                              <ButtonImage2 src={Notification} alt="user"/>
                           </ButtonBox>
                        </Button>
                        <Button>
                           <ButtonBox>
                              <ButtonImage2 src={Message} alt="user"/>
                           </ButtonBox>
                        </Button>
                        <Button>
                            Ads
                        </Button>
                        <Button>
                            <NavItem exact to={publishLink} activeStyle={{color:"#b92d47"}}>Publish ad</NavItem>
                        </Button>
                        <Button>
                            <NavItem exact  to="/" activeStyle={{color:"#b92d47"}}>Home</NavItem>
                        </Button>
                    </NavRight>
    }else{
        navRight = <NavRight>
                    <Button >
                        <NavItem to="/signup" exact activeStyle={{color:"#b92d47"}}>Sign up</NavItem>
                    </Button>
                    <Button>
                        <NavItem to="/signin" exact  activeStyle={{color:"#b92d47"}}>Sign in</NavItem>
                    </Button>
                    <Button>Ads</Button>
                    <Button>
                        <NavItem to={publishLink} activeStyle={{color:"#b92d47"}}>Publish ad</NavItem>
                    </Button>
                    <Button>
                        <NavItem exact  to="/" activeStyle={{color:"#b92d47"}}>Home</NavItem>
                    </Button>
                </NavRight>
    }
    return(
        <NavContainer>
            <MenuModal clicked={()=>{setMenu(!menu)}} show={menu}>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                   <MenuLink to="/user-profile" >View Profile</MenuLink>
                </MenuItem>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                   <MenuLink>Inbox</MenuLink>
                </MenuItem>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                   <MenuLink to="/user-profile/ads">My Ads</MenuLink>
                </MenuItem>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                  <MenuLink to="/user-profile/watching">Watchings</MenuLink>
                </MenuItem>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                   <MenuLink to="/user-profile" >Privacy & settings</MenuLink>
                </MenuItem>
                <MenuItem onClick={()=>{setMenu(!menu)}}>
                  Log out
                </MenuItem>
               
            </MenuModal>
           <NavMain>
               <NavLeft>
                   <LogoContainer>
                       <Logo>NAODAS</Logo>
                   </LogoContainer>
                   <SearchContainer>
                       <Input placeholder="Search Ads"/>
                   </SearchContainer>
               </NavLeft>
               {navRight}
           </NavMain>
        </NavContainer>
    );
};

export default MainNavigation;