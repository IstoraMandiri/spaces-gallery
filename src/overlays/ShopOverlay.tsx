import React, { useState } from "react";
import styled from "@emotion/styled";
import { EnvironmentStoreHook } from "stores/environment";
import { useShopify } from "services/shopify";
import { isMobile } from "react-device-detect";

type ShopProps = {
  overlay: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  //border: 2px dashed white;
  font-family: "Lato", sans-serif;
`;

const Exit = styled.div`
  width: auto;
  height: auto;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 25px;
  left: 25px;
  :hover {
    text-decoration: white underline;
  }
`;

const ProductDesc = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 20%;
  color: white;
  //border: 2px dashed red;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 90%;
  //border: 2px dashed red;
  border-radius: 5%;
  background-image: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/shirtPhoto.png");
  background-size: cover;
  background-position: center -90px;
  background-repeat: no-repeat;
  //mix-blend-mode: multiply;
`;

const ProductContent = styled.div`
  width: min(90%, 300px);
  //height: 50%;
  //border: 2px dashed green;
  border-radius: 5%;
  position: absolute;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sizes = styled.div`
  width: 100%;
  height: auto;
  //border: 2px dashed blue;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  #selectSize {
    //border: 1px dashed purple;
  }
`;

const SingleSize = styled.button`
  border: 1px solid black;
  margin: 20px 0 20px 0;
  outline: none;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  text-align: center;
  font-size: 1em;
  cursor: pointer;
  transition: border 0.5s ease-out;
  :hover {
    border: 1px solid white;
  }
`;

const Purchase = styled.div`
  width: min(200px, 90%);
  height: auto;
  text-align: center;
  //border: 2px solid yellow;
  border-radius: 5px;
  padding: 10px 0 10px 0;
  cursor: pointer;
  background-color: white;
  color: black;
  position: absolute;
  bottom: 15%;
  transition: background-color 0.5s ease-out, color 0.5s ease-out;
  :hover {
    background-color: red;
    color: white;
  }
`;

const Price = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  //bottom: 19%;
  top: 29%;
  color: white;
  margin: auto;
  //font-weight: bold;
  font-size: 1.5em;
`;

const ShopOverlay = (props: ShopProps) => {
  const { overlay, setOverlay } = props;
  const [size, setSize] = useState<number | undefined>(undefined);
  const [small, setSmall] = useState<boolean>(false);
  const [medium, setMedium] = useState<boolean>(false);
  const [large, setLarge] = useState<boolean>(false);
  const shopifyState = useShopify(); // /products/0/variants/available
  const { client, checkout, products } = shopifyState;
  // console.log(shopifyState);

  if (!overlay) {
    return <></>;
  }

  const Checkout = async () => {
    if (!shopifyState.products) {
      return;
    }
    if (size === undefined) {
      return;
    }
    const itemsToAdd = {
      // @ts-ignore
      variantId: products[0].variants[size].id,
      quantity: 1,
    };
    const newCheckout = await client.checkout.addLineItems(
      // @ts-ignore
      checkout.id,
      itemsToAdd
    );
    // console.log(newCheckout);
    window.open(newCheckout.webUrl);
  };

  return (
    <Overlay>
      <Exit
        onClick={() => {
          setOverlay(!overlay);
        }}
      >
        X
      </Exit>
      <ProductDesc>
        <h2>Spaces Portal 001</h2>
      </ProductDesc>
      <ProductContent
        style={{
          height: isMobile ? "50%" : "43%",
        }}
      >
        <ProductImage />
        <Sizes>
          {/*<h4 id="selectSize">Select Size: </h4>*/}
          <SingleSize
            id="small"
            style={{
              backgroundColor: small ? "white" : "black",
              color: small ? "black" : "white",
            }}
            onClick={() => {
              if (size === 0) {
                setSize(undefined);
                setSmall(false);
              } else {
                setSize(0);
                setSmall(true);
                setMedium(false);
                setLarge(false);
              }
            }}
          >
            S
          </SingleSize>
          <SingleSize
            id="medium"
            style={{
              backgroundColor: medium ? "white" : "black",
              color: medium ? "black" : "white",
            }}
            onClick={() => {
              if (size === 1) {
                setSize(undefined);
                setMedium(false);
              } else {
                setSize(1);
                setSmall(false);
                setMedium(true);
                setLarge(false);
              }
            }}
          >
            M
          </SingleSize>
          <SingleSize
            id="large"
            style={{
              backgroundColor: large ? "white" : "black",
              color: large ? "black" : "white",
            }}
            onClick={() => {
              if (size === 2) {
                setSize(undefined);
                setLarge(false);
              } else {
                setSize(2);
                setSmall(false);
                setMedium(false);
                setLarge(true);
              }
            }}
          >
            L
          </SingleSize>
        </Sizes>
      </ProductContent>
      <Price>$45</Price>
      <Purchase onClick={Checkout}>Purchase</Purchase>
    </Overlay>
  );
};

export default ShopOverlay;
