import React, { useState, useEffect } from "react";

import axios from "axios";

import { serverUrl } from "../utils/utils";
import {Categories} from '../components/Common/CateroyList';

import Navigation from "../components/Navigations/MainNavigation";
import NavItem from "../components/UserProfile/NavItem";
import Ad from "../components/Adds/CatAd";
import Skeleton from "../components/Skeletons/CatSkeleton";
// import Footer from "../components/Footer";


import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: auto;
`;
const MainBody = styled.div`
  width: 100%;
  height: auto;
`;
const CategoryContainer = styled.div`
  width: 81.7%;
  height: 85%;
  padding-top: 100px;
  margin-left: 10%;
`;
const CategoyNav = styled.div`
  width: 20%;
  height: 85vh;
  float: left;
 
`;
const CategoryMain = styled.div`
  width: 76%;
  height: auto;
  float: right;
  border-radius: 5px;
  display: flex;
  flex-flow: wrap;
`;

function Admin() {
  const [complete, setComplete] = useState(false);
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const ads = await axios.post(serverUrl, {
        query: `
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
                   `,
      });
      console.log("Home ads", ads);
      setAds(ads.data.data.homePageAds);
      setComplete(true);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  let homeAds;
  if (complete) {
    homeAds = ads.map((ad) => {
      return <Ad key={ad._id} ad={ad} />;
    });
  } else {
    homeAds = <Skeleton />;
  }
  return (
    <Container>
      <MainBody>
        <Navigation />
        <CategoryContainer>
          <CategoyNav>
            {Categories.map((nav) => {
              return <NavItem key={nav.id} name={nav.name} to={nav.to} />;
            })}
          </CategoyNav>
          <CategoryMain>
            {/* <Route path="/admin" exact component={Ads}/>
            <Route path="/admin/users" exact component={Users}/>
            <Route path="/admin/reports" exact component={Reports}/> */}
            {homeAds}
          </CategoryMain>
        </CategoryContainer>
      </MainBody>
      {/* <Footer /> */}
    </Container>
  );
}

export default Admin;
