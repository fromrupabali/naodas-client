import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 5px;
`
const Image = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 5px;
  
`
const Outlas = () =>{
    return(
        <Container>
           <Image src="https://img.freepik.com/free-photo/woman-holding-various-shopping-bags-copy-space_23-2148674122.jpg?size=626&ext=jpg" alt="gurl"/>
        </Container>
    );
};

export default Outlas;