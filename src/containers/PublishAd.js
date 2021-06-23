import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";
import axios from "axios";

import StripeCheckout from "react-stripe-checkout";

import { serverUrl } from "../utils/utils";
import { Categories } from "../components/Common/CateroyList";

import Navigation from "../components/Navigations/MainNavigation";
// import Outklas from "../components/Adds/OutlasAdd";
import Footer from "../components/Footer";
import Spinner from "../components/Modals/SpinnerModal";

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
  min-height: 100vh;
  @media (min-width: 1600px) {
    width: 60%;
    margin-left: 20%;
  }
`;
const AdBody = styled.div`
  width: 61%;
  height: auto;
  background: white;
  border-radius: 5px;
  margin: 0 0 40px 14%;
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
const InputBox1 = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 10px 0;
`;
const InputBoxLeft = styled.div`
  width: 49%;
  height: 100%;
  float: left;
`;
const InputBoxLeft1 = styled.div`
  width: 100.5%;
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
  width: 107.5%;
  height: auto;
  margin-top: 10px;
  display: flex;
  flex-flow: wrap;
`;
// const mymove = styled.div`
//    background: rgb(180, 177, 177);
// `
const ImageBox = styled.div`
  width: 30%;
  height: 200px;
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
  width: 30%;
  height: 200px;
  margin: 0 2% 2% 0;
  border-radius: 5px;
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
  let imageBoxes = [];
  const [spinner, setSpinner] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [shippingType, setShippingType] = useState("collection");
  const [contactType, setContactType] = useState("SHOW_PHONE");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [planName, setPlanName] = useState(false);
  // const [paid, setPaid] = useState(false);
  const [days, setDays] = useState(0);
  const [step, setStep] = useState(true);
  const [redirect, setRedirect] = useState(null);
  const [adLink, setAdlink] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);

  //List Category
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Cars",
  //     subCategories: [
  //       {
  //         id: 1,
  //         name: "Volvo",
  //       },
  //       {
  //         id: 2,
  //         name: "Tata",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Jobs",
  //     subCategories: [
  //       {
  //         id: 1,
  //         name: "Volvo",
  //       },
  //       {
  //         id: 2,
  //         name: "Tata",
  //       },
  //     ],
  //   },
  // ];

  const categoryOptions = Categories.map((cat, id) => {
    return <option value={id}>{cat.name}</option>;
  });
  const handleFileChange = (e) => {
    const files = e.target.files;

    setTotalImages(e.target.files.length);
    setImageUpload(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadToAws({ variables: { file } });
    }
  };

  const onToken = async (token) => {
    console.log(token);
    setSpinner(true);
    let amount;
    if (days === 7) {
      amount = 3;
    }
    if (days === 15) {
      amount = 5;
    }
    await axios.post(serverUrl, {
      query: `
           mutation{
             payment(
               source:"${token.id}",
               adId:"${adLink}",
               amount:${amount},
               email:"${token.email}"
               ){
               _id
             }
           }
          `,
    });
    setSpinner(false);
    setRedirect(<Redirect to={"view-ad/" + adLink} />);
    // setSuccess(true);
    // localStorage.removeItem('orderId');
    // localStorage.removeItem('total');
  };

  //Image upload
  const [uploadToAws] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      console.log("Data", data);
      const newImages = images;
      newImages.push(data.uploadToAws.url);
      setImages(newImages);
      console.log("images", newImages);
      setTotalImages(totalImages - 1);
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
  // showImages = images.map((img) => {
  //   return <Image src={img} alt="image" />;
  // });

  // if (totalImages <= 0) {
  //   filesContainer = (
  //     <UploadContainer>
  //       <Input
  //         style={{ width: "50%", cursor: "pointer" }}
  //         type="file"
  //         multiple
  //         onChange={handleFileChange}
  //       />
  //     </UploadContainer>
  //   );
  // } else {
  //   filesContainer = (
  //     <ImagesContainer>
  //       {imageBoxes}
  //       {showImages}
  //     </ImagesContainer>
  //   );
  // }

  //Ad upload
  const adHandler = async (e) => {
    try {
      e.preventDefault();
      // console.log("Title", title);
      // console.log("Category", category);
      // console.log("Images", images.length);
      // console.log("Country", country);
      // console.log("City", city);
      // console.log("Address", address);
      // console.log("Price", price);
      // console.log("Shipping Type", shippingType);
      // console.log("Contact type", contactType);
      // console.log("Quantity", quantity);
      // console.log("Plan Name", planName);
      // console.log("Plan days", days);
      console.log("Cat name", Categories[categoryId].name);
      console.log("Cat id", Categories[categoryId].id);
      if (
        title &&
        categoryId &&
        images.length > 0 &&
        country &&
        city &&
        address &&
        price &&
        shippingType &&
        contactType &&
        quantity
      ) {
        setSpinner(true);
        let desc = description.replace(/(?:\r\n|\r|\n)/g, "");
        const ad = await axios.post(serverUrl, {
          query: `
                     mutation{
                        createAd(input:{
                          title:"${title}",
                          categoryName:"${Categories[categoryId].name}",
                          categoryId:"${Categories[categoryId].id}",
                          subcategoryName:"{subCategory}",
                          subcategoryId:"1",
                          quantity:${quantity},
                          price:${price}
                          description:"${desc}",
                          images:${JSON.stringify(images).replace(
                            /"([^(")"]+)":/g,
                            "$1:"
                          )},
                          days:${days},
                          planName:"${planName}",
                          address:"${address}",
                          country:"${country}",
                          city:"${city}",
                          token:"${localStorage.TOKEN}"
                          paid:false                          
                        }){
                          _id
                          title
                        }
                     }
                  `,
        });
        setSpinner(false);
        console.log("Created ad", ad);
        if (planName) {
          window.scrollTo(0, 0);
          setStep(false);
          setAdlink(ad.data.data.createAd._id);
        } else {
          setRedirect(<Redirect to={"view-ad/" + ad.data.data.createAd._id} />);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategoryId(e.target.value);
    //    setCategoryId(catId);
  };
  const homePlanHandler = () => {
    setPlanName(true);
    setDays(7);
  };
  const freePlanHandler = () => {
    setPlanName(false);
    setDays(0);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <div>
      {redirect}
      <Spinner show={spinner} />
      <Navigation />
      <Container>
        {/* <Outklas /> */}

        {step ? (
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
                <InputBoxLeft1>
                  <InputTitle>Category</InputTitle>
                  <SelectInput
                    required={true}
                    value={categoryId}
                    onChange={categoryChangeHandler}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions}
                  </SelectInput>
                </InputBoxLeft1>
                {/* <InputBoxRight>
                <InputTitle>Sub Category</InputTitle>
                <SelectInput>
                  <option>Mobile</option>
                  <option>Tv</option>
                  <option>Charger</option>
                  <option>Others</option>
                </SelectInput>
              </InputBoxRight> */}
              </InputBox>
              <InputBox1>
                <InputTitle>Images</InputTitle>
                {!imageUpload ? (
                  <UploadContainer>
                    <Input
                      style={{ width: "50%", cursor: "pointer" }}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </UploadContainer>
                ) : (
                  <ImagesContainer>
                    {imageBoxes}
                    {images.map((img) => (
                      <Image src={img} />
                    ))}
                  </ImagesContainer>
                )}
                {/* {filesContainer} */}
                {/* {images.map((img) => (
                <Image src={img} />
              ))} */}
              </InputBox1>
              {/* <InputBox>
              <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </InputBox> */}
              <InputBox>
                <InputBoxLeft>
                  <InputTitle>Product Price</InputTitle>
                  <Input
                    required={true}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    min="1"
                    placeholder="Enter price as $"
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
                {!planName ? (
                  <Plan style={{ border: "2px solid green" }}>
                    <PlanTitle>BASIC</PlanTitle>
                    <PlanName>Free</PlanName>
                    <PlanDetails>All Basic Stuff</PlanDetails>
                  </Plan>
                ) : (
                  <Plan onClick={freePlanHandler}>
                    <PlanTitle>BASIC</PlanTitle>
                    <PlanName>Free</PlanName>
                    <PlanDetails>All Basic Stuff</PlanDetails>
                  </Plan>
                )}
                {planName ? (
                  <Plan style={{ border: "2px solid green" }}>
                    <PlanTitle>Home Page AD</PlanTitle>
                    <div style={{ padding: "10px 0" }}>
                      {/* <input
                      onChange={(e) => setDays(7)}
                      checked={days === 7}
                      type="radio"
                      value="collection"
                    /> */}
                      {days === 7 ? (
                        <button type="button" className="PlanActive">
                          7 days (USD 3)
                        </button>
                      ) : (
                        <button
                          onClick={() => setDays(7)}
                          type="button"
                          className="PlanNotActive"
                        >
                          7 days (USD 3)
                        </button>
                      )}
                      {/* <label>7 days (USD 3)</label> */}
                    </div>
                    <div style={{ padding: "10px 0" }}>
                      {/* <input
                      onChange={(e) => setDays(15)}
                      checked={days === 15}
                      type="radio"
                      value="collection"
                    /> */}
                      {/* <label>15 days (USD 5)</label> */}
                      {days === 15 ? (
                        <button type="button" className="PlanActive">
                          15 days (USD 5)
                        </button>
                      ) : (
                        <button
                          onClick={() => setDays(15)}
                          type="button"
                          className="PlanNotActive"
                        >
                          15 days (USD 5)
                        </button>
                      )}
                    </div>
                  </Plan>
                ) : (
                  <Plan onClick={homePlanHandler}>
                    <PlanTitle>Home Page AD</PlanTitle>
                    <div style={{ padding: "10px 0" }}>
                      <button type="button" className="PlanNotActive">
                        7 days (USD 3)
                      </button>
                    </div>
                    <div style={{ padding: "10px 0" }}>
                      <button type="button" className="PlanNotActive">
                        15 days (USD 5)
                      </button>
                    </div>
                  </Plan>
                )}
              </Plans>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Button type="submit">Submit Ad</Button>
              </div>
            </form>
          </AdBody>
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h2 style={{ margin: "0", padding: "0" }}>Payment</h2>
            <p style={{ padding: "0 32%" }}>
              Your ad creating successfully. Complete payment via card and
              proceed.
            </p>
            <img
              style={{ width: "40%", height: "280px", marginBottom: "20px" }}
              src="https://i.pinimg.com/originals/9b/e0/3a/9be03a37749347b8da7948457628b697.jpg"
              alt="img"
            />
            <div>
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51IzHbbEF1W6drQ5L1i40HejJnNr7bn0qMo1LRKbGt9JLOzLzdWmqfebneD52eZmbie124DOHpZlSDyA8iAasTF4300e2WRjqrb"
              />
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default PublishAd;
