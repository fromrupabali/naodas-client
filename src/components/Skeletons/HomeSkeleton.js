import React from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 102%;
  height: 1000px;
  display: flex;
  flex-flow: wrap;
`;
// const mymove = styled.div`
//    background: rgb(180, 177, 177);
// `

const Ad = styled.div`
  width: 23%;
  height: 300px;
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
  return<Container>
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
            <Ad />
       </Container>;
};

export default homeSkeleton;
