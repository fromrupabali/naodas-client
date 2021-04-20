import React from 'react';

import Watch from './Watch';
import styled from 'styled-components';

const WatchingsContainer = styled.div`
   width: 106%;
   height: 83vh;
   display: flex;
   flex-flow: wrap;
   overflow-y: scroll;
`

export default function Watchings(){
    return(
        <WatchingsContainer>
            <Watch />
            <Watch />
             <Watch />
            <Watch />
            <Watch />
            <Watch />
            <Watch />
        </WatchingsContainer>
    );  
};