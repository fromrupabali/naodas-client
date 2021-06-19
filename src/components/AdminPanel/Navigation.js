import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 60px;
  background: white;
  position: fixed;
  border-bottom: 1px solid #eee;
`;
const NavMain = styled.div`
  width: 85%;
  height: 100%;
  margin-left: 7%;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
`;
const NavLeft = styled.div`
  width: 50%;
  height: 100%;
  float: left;
`;
const LogoContainer = styled.div`
  width: 22%;
  height: 100%;
  float: left;
`;
const Logo = styled.h1`
  margin: 0;
  padding: 9% 0;
  color: #b92d47;
  font-size: 1.5em;
  text-align: left;
`;

function Admin() {
  return (
    <Container>
      <NavMain>
        <NavLeft>
          <LogoContainer>
            <Link style={{ textDecoration: "none" }} to="/admin">
              <Logo>NAODAS</Logo>
            </Link>
          </LogoContainer>
        </NavLeft>
      </NavMain>
    </Container>
  );
}

export default Admin;
