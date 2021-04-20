import React from 'react';

import styled from 'styled-components';

const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 700;
    left: 0;
    top: 0;
    background: #6262635e;
`
const Backdrop = (props) => (
    props.show ? <BackDrop className="Backdrop" onClick={props.clicked}>
    </BackDrop> : null
);

export default Backdrop;