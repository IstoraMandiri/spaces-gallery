import React from "react";
import Shopify from "@spacesvr/components/Shop";
const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

const domain = "spaceslabs.myshopify.com";

const Shop = () => {
  return (
    <group>
      <Shopify
        domain={domain}
        token={`${NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS}`}
      />
    </group>
  );
};

export default Shop;
