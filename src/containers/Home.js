import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";
import { serverUrl } from "../utils/utils";

import Navigation from "../components/Navigations/MainNavigation";
import OutlasAdd from "../components/Adds/OutlasAdd";
import Ad from "../components/Adds/HomeAdd";
import Skeleton from "../components/Skeletons/HomeSkeleton";
import LoadSkeleton from "../components/Skeletons/HomeSkeleton";
import Footer from "../components/Footer";

import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
  height: auto;
`;
const HomeCanvas = styled.div`
  width: 80%;
  margin-left: 10%;
  padding-top: 100px;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
`;
const Title = styled.h1`
  font-size: 1.3em;
  margin: 0;
  padding: 30px 0 10px 0;
  font-weight: 500;
  text-transform: uppercase;
  color: #d7435e;
  @media (max-width: 798px) {
    padding: 20px 0 15px 0;
    font-size: 1em;
  }
`;
const AllAdds = styled.div`
  width: 102%;
  display: flex;
  flex-flow: wrap;
  padding: 20px 0;
  @media (max-width: 798px) {
    padding: 0;
  }
`;

function Home() {
  const [complete, setComplete] = useState(false);
  const [ads, setAds] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchAds = async () => {
    try {
      const fetch_ads = await axios.post(serverUrl, {
        query: `
                      query{
                          homePageAds(skip:${skip}){
                              _id
                              title
                              images
                              city
                              country
                              user
                              price
                              images
                              createdAt
                          }
                      }
                   `,
      });
      console.log("Home ads", fetch_ads);
      const data = fetch_ads.data.data.homePageAds;
      const allAds = [...ads, ...data];
      if (data.length <= 0) {
        setHasMore(false);
      }
      setAds(allAds);
      setSkip(skip + data.length);
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
    <HomeContainer>
      <OutlasAdd />
      <Title>Recently Added</Title>
      <InfiniteScroll
        dataLength={ads.length} //This is important field to render the next data
        next={fetchAds}
        hasMore={hasMore}
        loader={<LoadSkeleton />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more ads found!</b>
          </p>
        }
      >
        <AllAdds>{homeAds}</AllAdds>
      </InfiniteScroll>

      {/* <Footer /> */}
    </HomeContainer>
  );
}

export default Home;
