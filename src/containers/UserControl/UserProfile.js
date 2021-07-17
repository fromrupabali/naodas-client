import React, { useState, useEffect } from "react";

import { Route } from "react-router-dom";

import axios from "axios";
import { serverUrl } from "../../utils/utils";

import Navigation from "../../components/Navigations/MainNavigation";
import Footer from "../../components/Footer";
import NavItem from "../../components/UserProfile/NavItem";
import Profile from "../../components/UserProfile/Profile";
import YourAds from "../../components/UserProfile/YourAds/YourAds";
import Watchings from "../../components/UserProfile/YourWatchings/Watchings";
import Outlas from "../../components/Adds/OutlasAdd";

import styled from "styled-components";

const ProfileContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const LeftNav = styled.div`
  width: 20%;
  height: 100%;
  float: left;
`;
const Body = styled.div`
  width: 76%;
  height: auto;
  float: right;
`;
const AddDiv = styled.div`
  width: 80%;
  margin-left: 10%;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
`;

function UserProfile() {
  const [complete, setComplete] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const user = await axios.post(serverUrl, {
        query: `
                      query{
                          user(token:"${localStorage.TOKEN}"){
                              _id
                              userName
                              
                          }
                      }
                   `,
      });
      setUser(user.data.data.user);
      setComplete(true);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const navItems = [
    {
      id: 1,
      name: "Profile",
      to: "/user-profile",
    },
    {
      id: 2,
      name: "Ads",
      to: "/user-profile/ads",
    },
    {
      id: 3,
      name: "Watchings",
      to: "/user-profile/watching",
    },
  ];
  return (
    <div>
    
      {complete ? (
        <ProfileContainer>
          <LeftNav>
            {navItems.map((nav) => {
              return <NavItem key={nav.id} name={nav.name} to={nav.to} />;
            })}
          </LeftNav>
          <Body>
            <Route
              path="/user-profile"
              exact
              render={(props) => <Profile {...props} user={user} />}
            />
            <Route path="/user-profile/ads" exact component={YourAds} />
            <Route path="/user-profile/watching" exact component={Watchings} />
          </Body>
          {/* <Profile>
                 <ImageContainer>
                     <Image src={Virat} alt="profile-image"/>
                 </ImageContainer>
                 <ProfileDetails>
                     <ProfileName>Virat Kohli</ProfileName>
                     <Location><PinImage src={Pin} alt="location"/> Dhaka, Bangladesh</Location>  
                 </ProfileDetails>
             </Profile> */}
        </ProfileContainer>
      ) : (
        <div style={{ minHeight: "100vh" }}>
            <p style={{paddingTop:"150px", textAlign:"center"}}>Loading.....</p>
        </div>
      )}
      <AddDiv>
        <Outlas />
      </AddDiv>
      <Footer />
    </div>
  );
}
export default UserProfile;
