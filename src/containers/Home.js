import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {serverUrl } from '../utils/utils';

import Navigation from '../components/Navigations/MainNavigation';
import OutlasAdd from '../components/Adds/OutlasAdd';
import Ad from '../components/Adds/HomeAdd';
import Skeleton from '../components/Skeletons/HomeSkeleton';
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
    @media(min-width: 1600px){
        width: 60%;
        margin-left: 20%;
    }
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
    const [complete, setComplete] = useState(false);
    const [ads, setAds] = useState([]);

    const fetchAds = async()=>{
        try {
            const ads = await axios.post(
                serverUrl,
                {
                   query:`
                      query{
                          homePageAds{
                              _id
                              title
                              images
                              city
                              country
                              user
                              price
                              images
                          }
                      }
                   `
                }
            );
            console.log("Home ads",ads);
            setAds(ads.data.data.homePageAds);
            setComplete(true);
        } catch (error) {
            throw error;
        }
    }
    
    useEffect(()=>{
        fetchAds()
    },[]);
    
    let homeAds;
    if(complete){
        homeAds = ads.map(ad =>{
            return<Ad key={ad._id}  ad={ad}/>
        });
    }else{
        homeAds = <Skeleton />
    }
    return(
        <HomeContainer>
            <Navigation /> 
            <HomeCanvas>
                 <OutlasAdd />
                <Title>Recently Added</Title>
                <AllAdds>
                   {homeAds}
                </AllAdds>
            </HomeCanvas>
            <Footer />
        </HomeContainer>
    );
};

export default Home;