import React from 'react';

import Img from '../../../assets/1.jpg';

import styled from 'styled-components';

const Ad = styled.div`
   width: 98%;
   height: 120px;
   margin: 0 0 1% 0;
   border-radius: 5px;
   border: 1px solid #eee;
   cursor: pointer;
`
const AdBasic = styled.div`
   width: 35%;
   height: 100%;
   float: left;
`
const ImageContainer = styled.div`
   width: 50%;
   height: 100%;
   float: left;
`
const Image = styled.img`
   width: 90%;
   height: 90%;
   border-radius: 5px;
   margin: 5%;
   object-fit: cover;
`
const AdNameConatienr = styled.div`
   width: 45%;
   height: 100%;
   float: right;
   display: flex;
   justify-content: center;
    align-items: center;
`
const AdName = styled.p`
   margin: 0;
   paddig: 0;
   font-weight: 500;
 font-size: 1.1em;
   
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
    font-size: 1.1em;
`
const ad = () =>{
    return<Ad>
            <AdBasic>
                <ImageContainer>
                    <Image src={Img} alt="image"/>
                </ImageContainer>
                <AdNameConatienr>
                   <AdName>Ad name</AdName>
                </AdNameConatienr>
            </AdBasic>
            <AdDetails>
                <LeftBasic>
                    <LeftBasic>
                        <Value>1</Value>
                    </LeftBasic>
                    <RightBasic>
                        <Value>2</Value>
                    </RightBasic>
                </LeftBasic>
                <RightBasic>
                    <LeftBasic>
                       <Value>3</Value>
                    </LeftBasic>
                    <RightBasic>
                        <Value>
                            <button>Edit</button>
                            <button>Delete</button>
                        </Value>
                    </RightBasic>
                </RightBasic>
            </AdDetails>
         </Ad>
};

export default ad;