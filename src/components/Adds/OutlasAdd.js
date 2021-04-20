import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 220px;
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
           <Image src="https://www.ascentialedge.com/sites/default/files/content-images/event/Hackathon-Amazon-Eventpage.jpg" alt="gurl"/>
        </Container>
    );
};

export default Outlas;