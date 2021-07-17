import React, { Component } from "react";

import axios from "axios";
import { serverUrl } from "../utils/utils";

import Navigation from "../components/Navigations/MainNavigation";
import Ad from "../components/Adds/HomeAdd";
import Skeleton from "../components/Skeletons/HomeSkeleton";
import NotFound from "../assets/not-found.png";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const AllAdds = styled.div`
  width: 102%;
  display: flex;
  flex-flow: wrap;
  padding: 0;
`;
const EmptyResult = styled.div`
  text-align: center;
  padding-top: 100px;
  width: 30%;
  margin-left: 37%;
`;
const Img = styled.img`
  width: 60px;
  height: 60px;
`;
const NotFoundText = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 1.2em;
`;
const NotFoundText2 = styled.p`
  margin: 0;
  padding: 10px 0;
  font-size: 1em;
  color: gray;
`;

class SearchResult extends Component {
  state = {
    ads: [],
    complete: false,
  };

  fetchAds = async () => {
    const searchResult = await axios.post(serverUrl, {
      query: `
                  query{
                      searchAds(searchText:"${this.props.match.params.searchText}"){
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
    this.setState({
      ads: searchResult.data.data.searchAds,
      complete: true,
    });
  };
  componentDidMount = () => {
    this.fetchAds();
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.match.params.searchText !== prevProps.match.params.searchText
    ) {
      this.fetchAds();
    }
  };
  render() {
    let result;
    if (this.state.complete) {
      if (this.state.ads.length > 0) {
        result = (
          <AllAdds>
            {this.state.ads.map((ad) => {
              return <Ad key={ad._id} ad={ad} />;
            })}
          </AllAdds>
        );
      } else {
        result = (
          <EmptyResult>
            <Img src={NotFound} alt="img" />
            <NotFoundText>Opps no result found!</NotFoundText>
            <NotFoundText2>
              We cannot find the item you are searching for, maybe a little
              spelling mistake or haven't in collection.
            </NotFoundText2>
          </EmptyResult>
        );
      }
    } else {
      result = <Skeleton />;
    }

    return (
      <div>
        <Container>{result}</Container>
      </div>
    );
  }
}

export default SearchResult;
