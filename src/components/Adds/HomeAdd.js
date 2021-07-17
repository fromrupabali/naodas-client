import React, { useState } from "react";
import { Link } from "react-router-dom";

import Timestamp from "react-timestamp";

import Pin from "../../assets/pin.svg";
import styled from "styled-components";

const Details = styled.div`
  width: 90%;
  height: 35%;
  margin: 2% 5%;
`;
const AddImages = styled.div`
  display: none;
`;
const AllImages = styled.div`
  width: 90%;
  height: auto;
  margin: 0 5%;
  padding: 12% 0;
  display: flex;
  overflow: hidden;
`;
const AddImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid white;
  &:hover {
    border: 2px solid #d7435e;
  }
`;
const AddImageActive = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #d7435e;
`;
const Container = styled.div`
  width: 23%;
  height: 300px;
  background: white;
  margin: 0 2% 2% 0;
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover ${Details} {
    display: none;
  }
  &:hover ${AddImages} {
    display: block;
  }
  @media (max-width: 769px) {
    width: 48%;
    height: 230px;
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 60%;
  @media (max-width: 769px) {
    height: 53%;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const AddName = styled.h3`
  margin: 0;
  padding: 2% 0 1% 0;
  font-weight: 500;
  font-size: 1em;
`;
const AddLocation = styled.p`
  margin: 0;
  padding: 0 0 4% 0;
  @media (max-width: 769px) {
    font-size: 0.8em;
  }
`;
const PinImage = styled.img`
  width: 13px;
  height: 15px;
  @media (max-width: 769px) {
    width: 10px;
    height: 13px;
  }
`;
const PriceDate = styled.div`
  width: 100%;
  height: 30%;
`;
const Date = styled.p`
  margin: 0;
  padding: 2px 0;
  color: gray;
  float: left;
  @media (max-width: 769px) {
    font-size: 0.9em;
  }
`;
const Price = styled.p`
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  color: #d7435e;
  float: right;
  font-weight: 500;
  @media (max-width: 769px) {
    font-size: 1em;
    margin: 3px 0 0 0;
  }
`;

function HomeAdd(props) {
  const [viewId, setViewId] = useState(0);
  let title;
  if (props.ad.title.length < 25) {
    title = props.ad.title;
  } else {
    title = props.ad.title.substring(0, 25) + "...";
  }
  const allImages = props.ad.images.map((image, id) => {
    if (id === viewId) {
      return (
        <AddImageActive
          key={id}
          onMouseEnter={() => {
            setViewId(id);
          }}
          src={props.ad.images[id]}
        />
      );
    }
    return (
      <AddImage
        key={id}
        onMouseEnter={() => {
          setViewId(id);
        }}
        src={props.ad.images[id]}
      />
    );
  });
  return (
    <Container
      onMouseLeave={() => {
        setViewId(0);
      }}
    >
      <ImageContainer to={"/view-ad/" + props.ad._id}>
        <Link to={"/view-ad/" + props.ad._id}>
          <Image src={props.ad.images[viewId]} alt="img" />
        </Link>
      </ImageContainer>
      <Details>
        <AddName>{title}</AddName>
        <AddLocation>
          <PinImage src={Pin} alt="location" /> {props.ad.city},{" "}
          {props.ad.country}
        </AddLocation>
        <PriceDate>
          <Date>
            <Timestamp relative date={props.ad.createdAt} autoUpdate />
          </Date>
          <Price>USD {props.ad.price}</Price>
        </PriceDate>
      </Details>
      <AddImages>
        <AllImages>{allImages}</AllImages>
      </AddImages>
    </Container>
  );
}

export default HomeAdd;
