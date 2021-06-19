import React,{useState, useEffect} from 'react';

import axios from 'axios';
import {serverUrl } from '../../../utils/utils';

import Watch from './Watch';
import Skeleton from '../../Skeletons/CatSkeleton';

import styled from 'styled-components';

const WatchingsContainer = styled.div`
   width: 106%;
   height: 83vh;
   display: flex;
   flex-flow: wrap;
   overflow-y: scroll;
`

export default function Watchings(){
    const [complete, setComplete] = useState(false);
    const [ads, setAds] = useState([]);

    const fetchAds = async()=>{
        const user = await axios.post(
            serverUrl,
            {
                query:`
                  query{
                     watchAds(token:"${localStorage.TOKEN}"){
                        _id
                       ad{
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
                  }
                `
            }
        );
        setAds(user.data.data.watchAds);
        setComplete(true);
    };
    useEffect(()=>{
      fetchAds();
    },[]);

    let allAds;
    if(complete){
       ads.length > 0 ?
         allAds = ads.map(watch =>{
             return<Watch key={watch._id} ad={watch.ad}/>
         }):
         allAds =<div style={{textAlign:"center", paddingTop:"100px"}}>No ads found!</div>
    }else{
        allAds = <Skeleton />
    }
    return(
        <WatchingsContainer>
            {allAds}
        </WatchingsContainer>
    );  
};