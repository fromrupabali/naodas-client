import React from 'react';

import Virat from '../../assets/virat.png';
import Pin from '../../assets/pin.svg';

import styled from 'styled-components';

const Profile = styled.div`
    width: 80%;
    padding: 0 10%;
    height: 300px;
    background: white;
    border-radius: 5px;
`

const ImageContainer = styled.div`
    width: 30%;
    height: 100%;
    float: left;
    text-align: center;
`
const Image = styled.img`
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 100%;
    margin-top: 70px;
    
`
const ProfileDetails = styled.div`
    width: 69%;
    height: 100%;
    float: right;
`
const ProfileName = styled.h1`
    margin: 0;
    padding: 100px 0 5px 0;
`
const Location = styled.p`
    margin: 0;
    padding: 0;
    font-weight: 500;
`  
const PinImage = styled.img`
   width: 17px;
   height: 17px;
`
const ChangePassword = styled.div`
   width: 50%;
   height: auto;
   margin: 30px 0 0 23%;
   background: white;
   padding: 20px;
   border-radius: 5px;
`
const Input = styled.input`
   width: 95%;
   padding: 15px 3%;
   border: 1px solid #ccc;
   display: block;
   margin: 10px 0;
   border-radius: 5px;
   outline: none;
   font-size: 1em;
`
const Button = styled.button`
   padding: 12px 30px;
   background:#B92D47;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   outline: none;
   margin: 10px 0;
`
const ChangeTitle = styled.p`
   font-size: 1.2em;
   margin:0;
   padding: 0;
`
const EditButton = styled.button`
    padding: 8px 30px;
    border: 1px solid #eee;
    color: #B92D47;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    margin: 10px 0;
`
const userProfile = (props)=>{
 
    return(
        <div>
          <Profile>
            <ImageContainer>
                <Image src={Virat} alt="profile-image"/>
            </ImageContainer>
            <ProfileDetails>
                <ProfileName>{props.user.userName}</ProfileName>
                <Location><PinImage src={Pin} alt="location"/> Dhaka, Bangladesh</Location>  
                <EditButton>Edit profile</EditButton>
            </ProfileDetails>
         </Profile> 
         <ChangePassword>
             <ChangeTitle>Change password</ChangeTitle>
             <Input type="password" placeholder="Old password"/>
             <Input type="password" placeholder="New password"/>
            <div style={{textAlign:"center"}}>
              <Button>Change Password</Button>
            </div>
         </ChangePassword>
        </div>
    );
};

export default userProfile;