import React from 'react';

import { Route } from 'react-router-dom';

import Navigation from '../../components/Navigations/MainNavigation';
import Footer from '../../components/Footer';
import NavItem from '../../components/UserProfile/NavItem';
import Profile from '../../components/UserProfile/Profile';
import YourAds from '../../components/UserProfile/YourAds/YourAds';
import Watchings from '../../components/UserProfile/YourWatchings/Watchings';
import Outlas from '../../components/Adds/OutlasAdd';


import styled from 'styled-components';

const ProfileContainer = styled.div`
    width: 80%;
    min-height: 100vh;
    margin-left: 10%;
    padding-top: 100px;
`
const LeftNav = styled.div`
    width: 20%;
    height: 100%;
    float: left;
`
const Body = styled.div`
    width: 76%;
    height: auto;
    float: right;
`


function UserProfile(){
    const navItems = [
        {
            id: 1,
            name: "Profile",
            to:"/user-profile"
        },
        {
            id: 2,
            name: "Ads",
            to:"/user-profile/ads"
        },
        {
            id: 3,
            name: "Watchings",
            to:"/user-profile/watching"
        }
    ];
   return(
       <div>
           <Navigation />
           <ProfileContainer>
              <LeftNav>
               {navItems.map(nav => {
                   return<NavItem key={nav.id} name={nav.name} to={nav.to}/>
               })}
              </LeftNav>
              <Body>
                  <Route path="/user-profile" exact component={Profile}/>
                  <Route path="/user-profile/ads" exact component={YourAds}/>
                  <Route path="/user-profile/watching" exact component={Watchings}/>
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
           <div style={{width: "80%", marginLeft: "10%"}}>
              <Outlas />
           </div>
           <Footer />
       </div>
   );
};
export default UserProfile;