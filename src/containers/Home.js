import React from 'react';

import Navigation from '../components/Navigations/MainNavigation';
import OutlasAdd from '../components/Adds/OutlasAdd';
import Add from '../components/Adds/HomeAdd';
import Footer from '../components/Footer';

import styled from 'styled-components';

const HomeContainer = styled.div`
    width: 100%;
    height: auto;
`
const HomeCanvas = styled.div`
    width: 80%;
    margin-left: 10%;
    padding-top: 100px;
`
const Title = styled.h1`
    font-size: 1.3em;
    margin: 0;
    padding: 30px 0 10px 0;
    font-weight: 500;
    text-transform: uppercase;
    color: #D7435E;
`
const AllAdds = styled.div`
    width: 102%;
    display: flex;
    flex-flow: wrap;
    padding: 20px 0;
`
function Home(){
    return(
        <HomeContainer>
            <Navigation /> 
            <HomeCanvas>
                 <OutlasAdd />
                <Title>Recently Added</Title>
                <AllAdds>
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                    <Add />
                </AllAdds>
            </HomeCanvas>
            <Footer />
        </HomeContainer>
    );
};

export default Home;