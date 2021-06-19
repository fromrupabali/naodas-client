import React from "react";

import Cancel from "../../assets/cancel.png";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid #eee;
`;
const Title = styled.h2`
  width: 80%;
  float: left;
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: 500;
  font-size: 1.3em;
  padding: 2.5% 0 0 7%;
`;
const CloseButton = styled.button`
  float: right;
  cursor: pointer;
  margin: 2.5% 2%;
`;
const ButtonImg = styled.img`
  width: 20px;
  height: 22px;
`;
const modalHeader = (props) => {
  return (
    <Container>
      <Title>{props.name}</Title>
      <CloseButton onClick={props.cancelHandler}>
        <ButtonImg src={Cancel} alt="cancel" />
      </CloseButton>
    </Container>
  );
};

export default modalHeader;
