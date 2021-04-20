import React from 'react';

import Ad from './Ad';

import styled from 'styled-components';

const AdsContainer = styled.div`
   width: 95.6%;
   height: 80vh;
   background: white;
   border-radius: 5px;
   padding: 2%;
`
const Title = styled.h3`
   margin: 0;
   padding: 0 0 10px 0;
   font-weight: 500;

`
const Heading = styled.div`
   width: 96%;
   height: 40px;
   border-bottom: 2px solid #eee;
   margin-bottom: 5px;
`
const Product = styled.div`
   width: 35%;
   height: 100%;
   float: left;
   display: flex;
   justify-content: center;
   align-items: center;
`

const AllAds = styled.div`
   width: 100%;
   height: 89.5%;
   overflow-y: scroll;
`
const AdDetails = styled.div`
width: 60%;
height: 100%;
float: right;
` 
const LeftBasic = styled.div`
width: 50%;
height: 100%;
float: left;
display: flex;
justify-content: center;
align-items: center;
`
const RightBasic =  styled.div`
width: 50%;
height: 100%;
float: right;
display: flex;
justify-content: center;
align-items: center;
`
const Value = styled.p`
font-weight: 500;
font-size: 1.2em;
`
export default function Ads(){
    return(
        <AdsContainer>
             <Title>Your Ads</Title>
             <Heading>
                 <Product>
                    <Value>Product</Value>
                 </Product>
                 <AdDetails>
                <LeftBasic>
                    <LeftBasic>
                        <Value>Views</Value>
                    </LeftBasic>
                    <RightBasic>
                        <Value>Quantity</Value>
                    </RightBasic>
                </LeftBasic>
                <RightBasic>
                    <LeftBasic>
                       <Value>Watching</Value>
                    </LeftBasic>
                    <RightBasic>
                        <Value>Actions</Value>
                    </RightBasic>
                </RightBasic>
            </AdDetails>
             </Heading>
             <AllAds>
                <Ad />
                <Ad />
                <Ad />
                <Ad />
                <Ad />
             </AllAds>
        </AdsContainer>
    );
};

