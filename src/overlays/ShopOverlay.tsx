import React, { useState } from "react";
import { useShopify } from "services/shopify";
import {
  Overlay,
  Exit,
  ProductDesc,
  ProductContent,
  ProductImage,
  Sizes,
  SingleSize,
  Price,
  Purchase,
} from "./components/ShopOverlayStyles";
import { isMobile } from "react-device-detect";

type ShopProps = {
  overlay: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShopOverlay = (props: ShopProps) => {
  const { overlay, setOverlay } = props;
  const [size, setSize] = useState<number | undefined>(undefined);
  const [small, setSmall] = useState<boolean>(false);
  const [medium, setMedium] = useState<boolean>(false);
  const [large, setLarge] = useState<boolean>(false);
  const shopifyState = useShopify(); // /products/0/variants/available
  const { client, checkout, products } = shopifyState;

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
          height: isMobile ? "51%" : "43%",
        }}
      >
        <ProductImage />
        <Sizes>
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
      <Purchase onClick={Checkout} style={{ bottom: isMobile ? "7%" : "15%" }}>
        Purchase
      </Purchase>
    </Overlay>
  );
};

export default ShopOverlay;
