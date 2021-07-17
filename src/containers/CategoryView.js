import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { serverUrl } from "../utils/utils";
import { Categories } from "../components/Common/CateroyList";

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
  padding-bottom: 50px;
`;
const CategoryContainer = styled.div`
  width: 102%;
  height: 85%;
`;
const CategoyNav = styled.div`
  width: 20%;
  height: 85vh;
  float: left;
  @media (max-width: 798px) {
    display: none;
  }
`;
const MobileCatNav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin-bottom: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 798px) {
    display: none;
  }
`;
const CategoryMain = styled.div`
  width: 76%;
  height: auto;
  float: right;
  border-radius: 5px;
  display: flex;
  flex-flow: wrap;
  @media (max-width: 798px) {
    width: 100%;
  }
`;

export default class CategoryView extends Component {
  state = {
    complete: false,
    ads: [],
    redirect: null,
  };
  fetchAds = async () => {
    try {
      this.setState({
        complete: false,
      });
      const ads = await axios.post(serverUrl, {
        query: `
                      query{
                        categoryAds(catId:"${this.props.match.params.catId}"){
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
      // setAds(ads.data.data.categoryAds);
      // setComplete(true);
      this.setState({
        ads: ads.data.data.categoryAds,
        complete: true,
      });
    } catch (error) {
      throw error;
    }
  };

  componentDidMount = () => {
    console.log("Hii", this.props.match.params.catId);
    if (!this.props.match.params.catId) {
      this.setState({
        redirect: <Redirect to="/categories/1" />,
      });
    }
    this.fetchAds();
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.catId !== prevProps.match.params.catId) {
      this.fetchAds();
    }
  };
  render() {
    let homeAds;
    if (this.state.complete) {
      homeAds = this.state.ads.map((ad) => {
        return <Ad key={ad._id} ad={ad} />;
      });
    } else {
      homeAds = <Skeleton />;
    }
    return (
      <Container>
        {this.state.redirect}
        <MainBody>
          <CategoryContainer>
            <MobileCatNav>
              {Categories.map((nav) => {
                return <NavItem key={nav.id} name={nav.name} to={nav.to} />;
              })}
            </MobileCatNav>
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
}
