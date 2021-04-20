import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import Navigation from '../components/Navigations/MainNavigation';

import styled from 'styled-components';
import OutlasAdd from '../components/Adds/OutlasAdd';
import Add from '../components/Adds/HomeAdd';
import Footer from '../components/Footer';

import Image1 from '../assets/1.jpg';
import Image2 from '../assets/2.jpg';
import Image3 from '../assets/3.jpg';

const AddViewContainer = styled.div`
    width: 80%;
    margin-left: 10%;
    padding-top: 100px;
`
const AddContent = styled.div`
    width: 100%;
    height: 70vh;
    padding: 0 0 1% 0;
`
const AddImages = styled.div`
    width: 50%;
    height: 100%;
    float: left;
`
const ImageView = styled.div`
    width: 100%;
    height: 80%;
    text-align: center;
`
const ViewedImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 5px;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid white;
    margin: 0 2% 2% 0;
    cursor: pointer;
    padding: 2px;
`
const ImageActive = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid #D7435E;
    margin: 0 2% 2% 0;
    cursor: pointer;
    padding: 2px;
`
const AllImages = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-flow: wrap;
`
const AddDetails = styled.div`
    width: 47%;
    height: 100%;
    float: right;
`
const Title = styled.h1`
    margin: 0;
    pading: 0;
    font-weight: 500;
    font-size: 1.6em;
`
const Price = styled.h2`
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 1.6em;
    color: #D7435E;
`
const Seller = styled.p`
    margin: 0;
    padding: 10px 0;
    font-weight: 400;
    font-size: 1.2em;
`
const Info = styled.p`
    margin: 0;
    padding: 2px 0;
    font-weight: 400;
    font-size: 1.1em;
`
const Button = styled.button`
    padding: 13px 45px;
    background: #D7435E;
    color: white;
    font-weight: bold;
    margin: 15px 0;
    border: none;
    cursor: pointer;
    border-radius: 25px;
    outline: none;
    &:hover{
        background: #b92d47;
    }
`
const OthersContent = styled.div`
    width: 100%;
    height: 50vh;
    margin: 0 0 30px 0;
`
const OthersNav = styled.div`
    width: 100%;
    height: auto;
    display: flex;
`
const NavItem = styled(NavLink)`
    padding: 20px 10px 10px 10px;
    margin-right: 20px;
    text-decoration: none;
    font-weight: 500;
    color: black;
    &:hover{
        color: #b92d47;
        border-bottom: 3px solid #b92d47;
    }
`
const OtherAdds = styled.div`
    width: 102%;
    height: auto;
    display:flex;
    flex-flow: wrap;
    padding: 20px 0 40px 0;
`
const images = [Image1, Image2, Image3];

function AddView(){
    const [viewId, setViewId] = useState(0);

    useEffect(()=>{
       window.scrollTo(0, 0);
    },[]);

    const allImages = images.map((image, id)=>{
        if(id === viewId){
            return<ImageActive onMouseEnter={()=>{setViewId(id)}} src={images[id]} />
        }else{
            return<Image onMouseEnter={()=>{setViewId(id)}} src={images[id]} alt="img"/>
        }
    });
    return(
        <div>
           <Navigation />
           <AddViewContainer>
             <AddContent>
               <AddImages>
                   <ImageView>
                       <ViewedImage src={images[viewId]}/>
                   </ImageView>
                   <AllImages>
                       {allImages}
                   </AllImages>
               </AddImages>
               <AddDetails>
                   <Title>Canon 48-HD camera</Title>
                   <Price>USD 500</Price>
                   <Seller>Seller: Peter</Seller>
                   <Info>Location: Banani 12, Dhaka, Bangladesh.</Info>
                   <Info>Quantity: 5</Info>
                   <Info>Shipping: Collection</Info>
                   <Info>Delivery charges: 0</Info>
                   <Info>Entered/renewed: 5 days ago</Info>
                   <Info>Ad views: 3</Info>
                   <Info>Ad watching: 1</Info>
                   <Info>Average ratings: 4.5/5</Info>
                   <Button>WATCH AD</Button>
               </AddDetails>
           </AddContent>
           <OthersContent>
               <OthersNav>
                   <NavItem to="/view-add" exact activeStyle={{color:"#b92d47", borderBottom:"3px solid #b92d47"}}>Comment</NavItem>
                   <NavItem to="/view-add/send-message" exact activeStyle={{color:"#b92d47", borderBottom:"3px solid #b92d47"}}>Send message</NavItem>
                   <NavItem exact activeStyle={{color:"#b92d47", borderBottom:"3px solid #b92d47"}} to="/view-add/report-add">Report add</NavItem>
                   <NavItem exact activeStyle={{color:"#b92d47", borderBottom:"3px solid #b92d47"}} to="/view-add/feedback">Feedback</NavItem>
               </OthersNav>
           </OthersContent>
           <Title style={{textTransform:" uppercase", fontSize:"1.3em"}}>Other adds of this seller</Title>
           <OtherAdds>
             <Add />
             <Add />
             <Add />
             <Add />
           </OtherAdds>
            <OutlasAdd />
           </AddViewContainer>
           <Footer />
        </div>
    );
};

export default AddView;