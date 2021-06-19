import React from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-flow: wrap;
  padding-top: 100px;
  height: 100vh;
`;
// const mymove = styled.div`
//    background: rgb(180, 177, 177);
// `

const Ad = styled.div`
  width: 50%;
   height: 100%;
  background: rgb(180, 177, 177);
  @keyframes mymove {
    from {
      background-color: #e6e1e1;
    }
    to {
      background-color: #c7caca;
    }
  }
  animation: mymove 1s infinite;
  margin: 0 2% 2% 0;
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const homeSkeleton = () => {
  return (
    <Container>
      <Ad />
     
    </Container>
  );
};

export default homeSkeleton;
