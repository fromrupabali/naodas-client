import React,{useState, useEffect} from 'react';

import axios from 'axios';
import {serverUrl } from '../../../utils/utils';

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
    const [complete, setComplete] = useState(false);
    const [ads, setAds] = useState([]);

    const fetchAds = async()=>{
        const ads = await axios.post(
            serverUrl,
            {
                query:`
                  query{
                    userAds(token:"${localStorage.TOKEN}"){
                         _id
                         images
                         title
                         watchingUsers
                         quantity
                     }
                  }
                `
            }
        );
        console.log("User ads", ads);
        setAds(ads.data.data.userAds);
        setComplete(true);
    };
    useEffect(()=>{
      window.scrollTo(0,0);
      fetchAds();
    },[]);

    let allAds;
    if(complete){
       ads.length > 0 ?
         allAds = ads.map(ad =>{
             return<Ad key={ad._id} ad={ad}/>
         }):
         allAds =<div style={{textAlign:"center", paddingTop:"100px"}}>No ads found!</div>
    }
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
                {allAds}
             </AllAds>
        </AdsContainer>
    );
};

