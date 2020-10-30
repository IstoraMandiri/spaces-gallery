import React from "react";
import Shopify from "@spacesvr/components/Shop";
const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

// const domain = "spaceslabs.myshopify.com";
const domain = "awge-2018.myshopify.com";
const token = "c5d54a8eba89e37765872377e087d987";

const Shop = () => {
  return (
    <group>
      <Shopify
        domain={domain}
        // token={`${NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS}`}
        token={token}
      />
    </group>
  );
};

export default Shop;
