import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import Navigation from "../components/Navigations/MainNavigation";
import Outklas from "../components/Adds/OutlasAdd";
import Footer from "../components/Footer";

import styled from "styled-components";

const UPLOAD_FILE = gql`
  mutation uploadToAws($file: Upload!) {
    uploadToAws(file: $file) {
      url
    }
  }
`;
const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  padding-top: 100px;
  @media(min-width: 1600px){
    width: 60%;
    margin-left: 20%;
  }
`;
const AdBody = styled.div`
  width: 61%;
  height: auto;
  background: white;
  border-radius: 5px;
  margin: 40px 0 40px 14%;
  padding: 2% 5%;
`;
const Title = styled.h3`
  text-align: center;
`;
const InputBox = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 10px 0;
`;
const InputBoxLeft = styled.div`
  width: 49%;
  height: 100%;
  float: left;
`;
const InputBoxRight = styled.div`
  width: 49%;
  height: 100%;
  float: right;
`;
const InputTitle = styled.p`
  margin: 0;
  padding: 10px 0 5px 0;
  font-weight: 500;
`;
const Input = styled.input`
  width: 95%;
  padding: 15px 2.5%;
  font-size: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
`;
const SelectInput = styled.select`
  width: 100%;
  padding: 15px 2.5%;
  font-size: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
`;
const UploadContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 100px 0;
  border: 1px solid #eee;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
`;
const ImagesContainer = styled.div`
  width: 106%;
  height: auto;
  margin-top: 10px;
  display: flex;
  flex-flow: wrap;
`;
// const mymove = styled.div`
//    background: rgb(180, 177, 177);
// `
const ImageBox = styled.div`
  width: 14%;
  height: 100px;
  background: rgb(180, 177, 177);
  
  @keyframes mymove {
    from {
      background-color: #e6e1e1;
    }
    to {
      background-color: #c7caca;
    }
  }
  animation: mymove 1s infinite;
  margin: 0 2% 2% 0;
  border-radius: 5px;
`;
const Image = styled.img`
  width: 10%;
  height: 100px;
  margin: 0 2% 2% 0;
`;

const Description = styled.textarea`
  width: 96%;
  height: 150px;
  padding: 2%;
  resize: none;
  border: 1px solid #eee;
  outline: none;
  border-radius: 5px;
  font: inherit;
  font-size: 15px;
`;
const Button = styled.button`
  padding: 13px 50px;
  cursor: pointer;
  border: none;
  background: #d8435e;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  outline: none;
`;
const Plans = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Plan = styled.div`
  width: 48%;
  height: 240px;
  background: #f0f2f5;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  border: 2px solid #eee;
`;
const PlanTitle = styled.h3`
  margin: 0;
  padding: 20px 0 5px 0;
  font-weight: 500;
`;
const PlanName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 2em;
  color: #d8435e;
`;
const PlanDetails = styled.p`
  margin: 0;
  padding: 0;
`;
function PublishAd() {
  let filesContainer,
    imageBoxes = [],
    allImages = [],
    showImages;

  const [totalImages, setTotalImages] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  // const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [shippingType, setShippingType] = useState("collection");
  const [contactType, setContactType] = useState("SHOW_PHONE");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [planName, setPlanName] = useState(true);
  const [days, setDays] = useState(0);

  //List Category
  const categories = [
    {
      id: 1,
      name: "Cars",
      subCategories: [
        {
          id: 1,
          name: "Volvo",
        },
        {
          id: 2,
          name: "Tata",
        },
      ],
    },
    {
      id: 2,
      name: "Jobs",
      subCategories: [
        {
          id: 1,
          name: "Volvo",
        },
        {
          id: 2,
          name: "Tata",
        },
      ],
    },
  ];

  const categoryOptions = categories.map((cat) => {
    return <option value={cat.name}>{cat.name}</option>;
  });
  const handleFileChange = (e) => {
    const files = e.target.files;
    setTotalImages(e.target.files.length);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadToAws({ variables: { file } });
    }
  };

  //Image upload
  const [uploadToAws] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      console.log(data);
      const newImages = images;
      newImages.push(data.uploadToAws.url);
      setImages(newImages);
      // console.log("Images", allImages);
      // setImage(data.uploadToAws.url);
      // const allImages=[];
      // allImages.push(data.uploadToAws.url);
      // setImages(allImages);
    },
  });
  for (let i = 0; i < totalImages; i++) {
    imageBoxes.push(<ImageBox />);
  }
  showImages = allImages.map((img) => {
    return <Image src={img} alt="image" />;
  });

  if (totalImages <= 0) {
    filesContainer = (
      <UploadContainer>
        <Input
          style={{ width: "50%", cursor: "pointer" }}
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </UploadContainer>
    );
  } else {
    filesContainer = (
      <ImagesContainer>
        {imageBoxes}
        {showImages}
      </ImagesContainer>
    );
  }

  //Ad upload
  const adHandler = async (e) => {
    try {
      e.preventDefault();
      console.log("Title", title);
      console.log("Category", category);
      console.log("Images", images);
      console.log("Country", country);
      console.log("City", city);
      console.log("Address", address);
      console.log("Price", price);
      console.log("Shipping Type", shippingType);
      console.log("Contact type", contactType);
      console.log("Quantity", quantity);
      console.log("Plan Name", planName);
      console.log("Plan days", days);
    } catch (error) {
      throw error;
    }
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
    //    setCategoryId(catId);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    showImages = allImages.map((id, img) => {
      return <Image key={id} src={img} alt="img" />;
    });
  }, [allImages]);
  return (
    <div>
      <Navigation />
      <Container>
        <Outklas />
        <AdBody>
          <Title>Enter Ad Details</Title>
          <form onSubmit={adHandler}>
            <InputBox>
              <InputTitle>Title</InputTitle>
              <Input
                required={true}
                onChange={titleChangeHandler}
                value={title}
                type="text"
                placeholder="Enter ad title"
              />
            </InputBox>
            <InputBox>
              <InputBoxLeft>
                <InputTitle>Category</InputTitle>
                <SelectInput
                  required={true}
                  value={category}
                  onChange={categoryChangeHandler}
                >
                  <option value="">Select Category</option>
                  {categoryOptions}
                </SelectInput>
              </InputBoxLeft>
              <InputBoxRight>
                <InputTitle>Sub Category</InputTitle>
                <SelectInput>
                  <option>Mobile</option>
                  <option>Tv</option>
                  <option>Charger</option>
                  <option>Others</option>
                </SelectInput>
              </InputBoxRight>
            </InputBox>
            <InputBox>
              <InputTitle>Images</InputTitle>
              {filesContainer}
            </InputBox>
            <InputBox>
              <InputBoxLeft>
                <InputTitle>Product Price</InputTitle>
                <Input
                  required={true}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Enter price"
                />
              </InputBoxLeft>
              <InputBoxRight>
                <InputTitle>Product Quantity</InputTitle>
                <Input
                  required={true}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                />
              </InputBoxRight>
            </InputBox>
            <InputBox>
              <InputBoxLeft>
                <InputTitle>Shipping</InputTitle>
                <input
                  onChange={(e) => setShippingType(e.target.value)}
                  checked={shippingType === "collection"}
                  type="radio"
                  value="collection"
                />
                <label>Collection</label>
                <input
                  onChange={(e) => setShippingType(e.target.value)}
                  checked={shippingType === "freepostage"}
                  type="radio"
                  value="freepostage"
                />
                <label>Free postage</label>
                <input
                  onChange={(e) => setShippingType(e.target.value)}
                  checked={shippingType === "postage"}
                  type="radio"
                  value="postage"
                />
                <label>Postage</label>
              </InputBoxLeft>
              <InputBoxRight>
                <InputTitle>Contact Info</InputTitle>
                <input
                  onChange={(e) => {
                    setContactType(e.target.value);
                  }}
                  checked={contactType === "SHOW_PHONE"}
                  type="radio"
                  value="SHOW_PHONE"
                />
                <label>Show mobile number</label>
                <input
                  onChange={(e) => {
                    setContactType(e.target.value);
                  }}
                  type="radio"
                  checked={contactType === "COMMENT"}
                  value="COMMENT"
                />
                <label>Comment</label>
              </InputBoxRight>
            </InputBox>
            <InputBox>
              <InputBoxLeft>
                <InputTitle>Country</InputTitle>
                <Input
                  required={true}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                />
              </InputBoxLeft>
              <InputBoxRight>
                <InputTitle>City</InputTitle>
                <Input
                  required={true}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Enter city"
                />
              </InputBoxRight>
            </InputBox>
            <InputBox>
              <InputTitle>Address</InputTitle>
              <Input
                required={true}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter area, road no, house no.."
              />
            </InputBox>
            <InputBox>
              <InputTitle>Description</InputTitle>
              <Description
                required={true}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Ad description with 300 words.."
              />
            </InputBox>
            <InputTitle style={{ padding: "5px 0" }}>
              Select your plan
            </InputTitle>
            <Plans>
              {planName ? (
                <Plan style={{ border: "2px solid green" }}>
                  <PlanTitle>BASIC</PlanTitle>
                  <PlanName>Free</PlanName>
                  <PlanDetails>All Basic Stuff</PlanDetails>
                </Plan>
              ) : (
                <Plan onClick={() => setPlanName(true)}>
                  <PlanTitle>BASIC</PlanTitle>
                  <PlanName>Free</PlanName>
                  <PlanDetails>All Basic Stuff</PlanDetails>
                </Plan>
              )}
              {!planName ? (
                <Plan style={{ border: "2px solid green" }}>
                  <PlanTitle>Home Page AD</PlanTitle>
                  <div style={{ padding: "10px 0" }}>
                    <input
                      onChange={(e) => setDays(7)}
                      checked={days === 7}
                      type="radio"
                      value="collection"
                    />
                    <label>7 days (USD 3)</label>
                  </div>
                  <div style={{ padding: "10px 0" }}>
                    <input
                      onChange={(e) => setDays(15)}
                      checked={days === 15}
                      type="radio"
                      value="collection"
                    />
                    <label>15 days (USD 5)</label>
                  </div>
                </Plan>
              ) : (
                <Plan onClick={() => setPlanName(false)}>
                  <PlanTitle>Home Page AD</PlanTitle>
                  <div style={{ padding: "10px 0" }}>
                    <input
                      onChange={(e) => setDays(7)}
                      checked={days === 7}
                      type="radio"
                      value="collection"
                    />
                    <label>7 days (USD 3)</label>
                  </div>
                  <div style={{ padding: "10px 0" }}>
                    <input
                      onChange={(e) => setDays(15)}
                      checked={days === 15}
                      type="radio"
                      value="collection"
                    />
                    <label>15 days (USD 5)</label>
                  </div>
                </Plan>
              )}
            </Plans>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <Button type="submit">Submit Ad</Button>
            </div>
          </form>
        </AdBody>
      </Container>
      <Footer />
    </div>
  );
}

export default PublishAd;
