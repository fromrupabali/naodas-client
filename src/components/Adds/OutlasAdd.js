import React from "react";
import Back from "../../assets/back.jpg";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  @media(max-width: 769px){
    width: 100%;
    height: 120px;
   }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const Outlas = () => {
  return (
    <Container>
      <Image src={Back} alt="gurl" />
    </Container>
  );
};

export default Outlas;
