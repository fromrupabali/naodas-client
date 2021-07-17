import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const Container = styled(NavLink)`
  width: 18%;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: black;
`;
const Title = styled.p`
  margin: 0;
  padding: 0;
`;
const Icon = styled.p`
  margin: 0;
  padding: 10px 0 0 0;
`;
const IconAd = styled.p`
  margin: 0;
  padding: 5px 0 0 0;
  font-size: 2.2em;
`;
const navItem = (props) => {
  let Nav;
  props.nav.type === 1
    ? (Nav = (
        <Container exact to={props.nav.link} activeStyle={{ color: "#b92d47" }}>
          <Icon>
            <FontAwesomeIcon icon={props.nav.icon} />
          </Icon>
          <Title>{props.nav.title}</Title>
        </Container>
      ))
    : props.nav.type === 3
    ? (Nav = (
        <Container
          to={props.nav.link}
          activeStyle={{ color: "#b92d47" }}
        >
          <Icon>
            <FontAwesomeIcon icon={props.nav.icon} />
          </Icon>
          <Title>{props.nav.title}</Title>
        </Container>
      ))
    : (Nav = (
        <Container exact to={props.nav.link} activeStyle={{ color: "#b92d47" }}>
          <IconAd>
            <FontAwesomeIcon icon={props.nav.icon} />
          </IconAd>
        </Container>
      ));
  return Nav;
};

export default navItem;
