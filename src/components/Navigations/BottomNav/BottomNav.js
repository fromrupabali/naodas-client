import React from "react";

import {
  faHome,
  faPlusCircle,
  faUser,
  faEnvelope,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import NavItem from "./NavItem";

import styled from "styled-components";
const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  margin-left: 5%;
`;

function BottomNav() {
  const navs = [
    {
      id: 1,
      title: "Home",
      type: 1,
      link: "/",
      icon: faHome,
    },
    {
      id: 1,
      title: "Ads",
      type: 3,
      link: "/categories/1",
      icon: faTh,
    },
    {
      id: 1,
      title: "Ad",
      type: 2,
      link: "/publish-post",
      icon: faPlusCircle,
    },
    {
      id: 1,
      title: "Chat",
      type: 1,
      link: "/chat",
      icon: faEnvelope,
    },
    {
      id: 1,
      title: "Account",
      type: 1,
      link: "/user-profile",
      icon: faUser,
    },
  ];
  return (
    <Container>
      {navs.map((nav) => {
        return <NavItem key={nav.id} nav={nav} />;
      })}
    </Container>
  );
}

export default BottomNav;
