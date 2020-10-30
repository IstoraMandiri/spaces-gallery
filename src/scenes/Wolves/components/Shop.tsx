import React from "react";
import Shopify from "@spacesvr/components/Shop";
import { Raycaster } from "three";
const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

// const domain = "spaceslabs.myshopify.com";
const domain = "awge-2018.myshopify.com";
const token = "c5d54a8eba89e37765872377e087d987";
const productImages = [
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_2ea1ae1e-72aa-4942-8338-d8b08a269a02_large.jpg?v=1603501447",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_079e44a6-3e87-4eeb-9609-f6a21d745a61_large.jpg?v=1603501021",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_384986ea-0f4c-4dbc-a930-da44cf3a2bab_large.png?v=1599079195",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_45178561-ccd9-445f-8c66-013add82e135_large.png?v=1599080363",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_4d8cb0aa-619c-4c8a-979f-b5c7b8026041_large.jpg?v=1599079804",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_1a2b4e25-0dfe-478a-84c8-ff4657c5d5a1_large.png?v=1594769690",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_82726e1d-ba22-4a60-868e-5ce42ef90f70_large.png?v=1589323873",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_5cada0fe-6b6f-413a-93ee-f1f99af54961_large.png?v=1589323497",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_ea2a193a-2912-4f61-ae96-16a9bc0295ce_large.png?v=1586379420",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_61f683c6-6be5-4081-8e7a-677a9dc4d8d8_large.png?v=1583883327",
  "https://cdn.shopify.com/s/files/1/0001/8435/products/image_62e7e6ed-ecb2-489a-bbc9-a6acf7c115d1_large.jpg?v=1583880137",
];
const links = [
  "https://store.killbrand.com/collections/we-are-wolves/products/wolves-chain-gold",
  "https://store.killbrand.com/collections/we-are-wolves/products/wolves-chain",
  "https://store.killbrand.com/collections/we-are-wolves/products/wolf-in-sheep-s-clothes",
  "https://store.killbrand.com/collections/we-are-wolves/products/don-t-loose-sleep-acid-wash",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-tie-dye-mask",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-hand-dyed-tee",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-tee-1",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-tee",
  "https://store.killbrand.com/collections/we-are-wolves/products/fangs-outs-mask?variant=33205005222028",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-gold-hoodie?variant=32614723387532",
  "https://store.killbrand.com/collections/we-are-wolves/products/we-are-wolves-orange-hoodie",
];

const Shop = (raycaster: React.MutableRefObject<Raycaster>) => {
  return (
    <group>
      <Shopify
        // domain={domain}
        // token={`${NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS}`}
        // token={token}
        localProducts={productImages}
        links={links}
        raycaster={raycaster}
      />
    </group>
  );
};

export default Shop;
