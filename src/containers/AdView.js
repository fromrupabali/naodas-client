import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";
import Navigation from "../components/Navigations/MainNavigation";

import axios from "axios";
import { serverUrl } from "../utils/utils";

import styled from "styled-components";
import OutlasAdd from "../components/Adds/OutlasAdd";
import Ad from "../components/Adds/HomeAdd";
import Footer from "../components/Footer";
const AddViewContainer = styled.div`
  width: 80%;
  margin-left: 10%;
  padding-top: 100px;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
`;
const AddContent = styled.div`
  width: 100%;
  height: 600px;
  padding: 0 0 1% 0;
`;
const AddImages = styled.div`
  width: 50%;
  height: 100%;
  float: left;
`;
const ImageView = styled.div`
  width: 100%;
  height: 80%;
  text-align: center;
  margin-bottom: 20px;
`;
const ViewedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid white;
  margin: 0 2% 2% 0;
  cursor: pointer;
  padding: 2px;
`;
const ImageActive = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid #d7435e;
  margin: 0 2% 2% 0;
  cursor: pointer;
  padding: 2px;
`;
const AllImages = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: wrap;
`;
const AddDetails = styled.div`
  width: 47%;
  height: 100%;
  float: right;
`;
const Title = styled.h1`
  margin: 0;
  pading: 0;
  font-weight: 500;
  font-size: 1.6em;
`;
const Price = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.6em;
  color: #d7435e;
`;
const Seller = styled.p`
  margin: 0;
  padding: 10px 0;
  font-weight: 400;
  font-size: 1.2em;
`;
const Info = styled.p`
  margin: 0;
  padding: 2px 0;
  font-weight: 400;
  font-size: 1.1em;
`;
const Button = styled.button`
  padding: 13px 45px;
  background: #d7435e;
  color: white;
  font-weight: bold;
  margin: 15px 0;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  &:hover {
    background: #b92d47;
  }
`;
const Button2 = styled.button`
  padding: 13px 45px;
  color: #d7435e;
  font-weight: bold;
  margin: 15px 0;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  border: 1px solid #d7435e;
  &:hover {
    color: #b92d47;
  }
`;
const WatchLink = styled(Link)`
  width: 100px;
  padding: 13px 45px;
  background: #d7435e;
  color: white;
  font-weight: bold;
  margin: 15px 0;
  border: none;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  display: block;
  text-align: center;
  text-decoration: none;
  &:hover {
    background: #b92d47;
  }
`;
const OthersContent = styled.div`
  width: 100%;
  height: 300px;
  margin: 0 0 30px 0;
`;
const OthersNav = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;
const NavItem = styled(NavLink)`
  padding: 20px 10px 10px 10px;
  margin-right: 20px;
  text-decoration: none;
  font-weight: 500;
  color: black;
  &:hover {
    color: #b92d47;
    border-bottom: 3px solid #b92d47;
  }
`;
const OtherAdds = styled.div`
  width: 102%;
  height: auto;
  display: flex;
  flex-flow: wrap;
  padding: 20px 0 40px 0;
`;

export default class AdView extends Component {
  state = {
    viewId: 0,
    complete: false,
    ad: {},
    otherAds: [],
    watch: false,
  };
  fetchAd = async () => {
    try {
      this.setState({
        watch: false,
      });
      const ad = await axios.post(serverUrl, {
        query: `
                         query{
                             singleAd(adId:"${this.props.match.params.adId}"){
                                 ad{
                                    _id
                                    title
                                    images
                                    city
                                    country
                                    address
                                    user
                                    price
                                    images
                                    quantity
                                    shippingType
                                    collectionPrice
                                    watchingUsers
    
                                  }
                                  otherAds{
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
                        `,
      });

      this.setState({
        ad: ad.data.data.singleAd.ad,
      });
      this.setState({
        otherAds: ad.data.data.singleAd.otherAds,
      });
      if (localStorage.TOKEN) {
        if (
          ad.data.data.singleAd.ad.watchingUsers.includes(localStorage.userId)
        ) {
          this.setState({
            watch: true,
          });
        }
      }
      this.setState({
        complete: true,
      });
    } catch (error) {
      throw error;
    }
  };
  adWatchHandler = async () => {
    try {
      this.setState({
        watch: true,
      });
      await axios.post(serverUrl, {
        query: `
                    mutation{
                        watchAd(userId:"${localStorage.userId}", adId:"${this.state.ad._id}"){
                            _id
                        }
                    }
                  `,
      });
    } catch (error) {
      throw error;
    }
  };
  componentDidMount = () => {
    this.fetchAd();
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.adId !== prevProps.match.params.adId) {
      this.fetchAd();
    }
  };
  render() {
    let allImages, watchButton, footer;
    if (this.state.complete) {
      allImages = this.state.ad.images.map((image, id) => {
        if (id === this.state.viewId) {
          return (
            <ImageActive
              onMouseEnter={() => {
                this.setState({
                  viewId: id,
                });
              }}
              src={this.state.ad.images[id]}
            />
          );
        } else {
          return (
            <Image
              onMouseEnter={() => {
                this.setState({
                  viewId: id,
                });
              }}
              src={this.state.ad.images[id]}
              alt="img"
            />
          );
        }
      });

      if (localStorage.TOKEN) {
        this.state.watch
          ? (watchButton = <Button2>WATCHING</Button2>)
          : (watchButton = (
              <Button onClick={this.adWatchHandler}>WATCH AD</Button>
            ));
      } else {
        watchButton = <WatchLink to="/signin">WATCH AD</WatchLink>;
      }
      footer = <Footer />;
    }
    return (
      <div>
        <Navigation />
        {this.state.complete ? (
          <AddViewContainer>
            <AddContent>
              <AddImages>
                <ImageView>
                  <ViewedImage src={this.state.ad.images[this.state.viewId]} />
                </ImageView>
                <AllImages>{allImages}</AllImages>
              </AddImages>
              <AddDetails>
                <Title>{this.state.ad.title}</Title>
                <Price>USD {this.state.ad.price}</Price>
                <Seller>Seller: Peter</Seller>
                <Info>
                  Location: {this.state.ad.address}, {this.state.ad.city},{" "}
                  {this.state.ad.country}
                </Info>
                <Info>Quantity: {this.state.ad.quantity}</Info>
                <Info>Shipping: {this.state.ad.shippingTYpe}</Info>
                <Info>Delivery charges: {this.state.ad.collectionPrice}</Info>
                <Info>Entered/renewed: 2 days ago</Info>
                <Info>Ad views: 3</Info>
                <Info>Ad watching: {this.state.ad.watchingUsers.length}</Info>
                <Info>Average ratings: 4.5/5</Info>
                {watchButton}
              </AddDetails>
            </AddContent>
            <OthersContent>
              <OthersNav>
                <NavItem
                  to="/view-add"
                  exact
                  activeStyle={{
                    color: "#b92d47",
                    borderBottom: "3px solid #b92d47",
                  }}
                >
                  Comment
                </NavItem>
                <NavItem
                  to="/view-add/send-message"
                  exact
                  activeStyle={{
                    color: "#b92d47",
                    borderBottom: "3px solid #b92d47",
                  }}
                >
                  Send message
                </NavItem>
                <NavItem
                  exact
                  activeStyle={{
                    color: "#b92d47",
                    borderBottom: "3px solid #b92d47",
                  }}
                  to="/view-add/report-add"
                >
                  Report add
                </NavItem>
                <NavItem
                  exact
                  activeStyle={{
                    color: "#b92d47",
                    borderBottom: "3px solid #b92d47",
                  }}
                  to="/view-add/feedback"
                >
                  Feedback
                </NavItem>
              </OthersNav>
            </OthersContent>
            <Title style={{ textTransform: " uppercase", fontSize: "1.3em" }}>
              Other adds of this seller
            </Title>
            <OtherAdds>
              {this.state.otherAds.map((ad) => {
                return <Ad key={ad._id} ad={ad} />;
              })}
            </OtherAdds>
            <OutlasAdd />
          </AddViewContainer>
        ) : null}
        {footer}
      </div>
    );
  }
}
