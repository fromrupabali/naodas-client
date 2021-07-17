import React from "react";

import styled from "styled-components";
import Navigation from "../components/Navigations/MainNavigation";
import MobileNav from "../components/Navigations/BottomNav/BottomNav";
import AdminNav from '../components/AdminPanel/Navigation';

const AppContainer = styled.div`
  width: 100%;
  height: auto;
`;

const AppContent = styled.div`
  width: 80%;
  margin-left: 10%;
  padding-top: 100px;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
  @media (max-width: 769px) {
    width: 90%;
    margin-left: 5%;
    padding-top: 80px;
  }
`;
const BottomNav = styled.div`
  width: 100%;
  height: 50px;
  background: white;
  bottom: 0;
  position: fixed;
  border-top: 1px solid #eee;
  @media (min-width: 769px) {
    display: none;
  }
`;

function AppLayout(props) {
  console.log(window.location.href.includes("admin"));
  let nav;
  if(window.location.href.includes("admin")){
      nav = <AdminNav />
   }else{
       nav = <Navigation />
   }
  return (
    <AppContainer>
      {nav}
      <AppContent>{props.children}</AppContent>
      <BottomNav>
        <MobileNav />
      </BottomNav>
    </AppContainer>
  );
}

export default AppLayout;
