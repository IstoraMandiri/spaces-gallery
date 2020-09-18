import React, { useState } from "react";
import styled from "@emotion/styled";
import { EnvironmentStoreHook } from "stores/environment";
import { useShopify } from "services/shopify";

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
  border: 2px dashed white;
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
  border: 2px dashed red;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 90%;
  border: 2px dashed red;
  border-radius: 5%;
  background-image: url("https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/images/shirtPhoto.png");
  background-size: cover;
  background-position: center -90px;
  background-repeat: no-repeat;
  //mix-blend-mode: multiply;
`;

const ProductContent = styled.div`
  width: min(90%, 300px);
  height: 40%;
  border: 2px dashed green;
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
  border: 2px dashed blue;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  #selectSize {
    border: 1px dashed purple;
  }
`;

const SingleSize = styled.button`
  border: 1px solid black;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  text-align: center;
  cursor: pointer;
  transition: border 0.5s ease-out;
  :hover {
    border: 1px solid white;
  }
`;

const AddToCart = styled.div`
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

const ShopOverlay = (props: ShopProps) => {
  const { overlay, setOverlay } = props;
  const [size, setSize] = useState<number>(0);
  const shopifyState = useShopify(); // /products/0/variants/available
  const { client, checkout, products } = shopifyState;
  console.log(shopifyState);

  if (!overlay) {
    return <></>;
  }

  const Checkout = async () => {
    if (!shopifyState.products) {
      return;
    }
    const itemsToAdd = {
      // @ts-ignore
      variantId: products[0].variants[size].id,
      quantity: 1,
    };
    // @ts-ignore
    const newCheckout = await client.checkout.addLineItems(
      checkout.id,
      itemsToAdd
    );
    console.log(newCheckout);
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
        <h2>Spaces Tee - $50</h2>
      </ProductDesc>
      <ProductContent>
        <ProductImage />
        <Sizes>
          <h4 id="selectSize">Select Size: </h4>
          <SingleSize
            id="small"
            onClick={() => {
              setSize(0);
            }}
          >
            S
          </SingleSize>
          <SingleSize
            id="medium"
            onClick={() => {
              setSize(1);
            }}
          >
            M
          </SingleSize>
          <SingleSize
            id="large"
            onClick={() => {
              setSize(2);
            }}
          >
            L
          </SingleSize>
        </Sizes>
      </ProductContent>
      <AddToCart onClick={Checkout}>Add To Cart</AddToCart>
    </Overlay>
  );
};

export default ShopOverlay;
