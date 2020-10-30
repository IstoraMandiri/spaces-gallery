import React from "react";
import { useShopify } from "@spacesvr/services/shopify";
import Image from "@spacesvr/components/Image";
const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

type ShopProps = {
  domain: string;
  token: string;
  itemSize?: number;
  itemRatio?: [number, number];
  spaceBetween?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const Shop = (props: ShopProps) => {
  const {
    domain,
    token,
    itemSize = 5,
    itemRatio = [1, 1],
    spaceBetween = 3,
    position = [0, 9, 0],
    rotation = [0, 0, 0],
  } = props;
  const shopifyState = useShopify({
    domain: domain,
    token: token,
  }); // /products/0/variants/available
  const { client, checkout, products } = shopifyState;
  const productImages: any[] = [];
  let positionOffset = 0;
  if (products) {
    // @ts-ignore
    products.forEach((product) => {
      console.log(product);
      const src = product.images[0].src;
      const productImage = (
        <Image
          src={src}
          ratio={itemRatio}
          sizeScale={itemSize}
          position={[spaceBetween * positionOffset, 2, 0]}
          rotation={[0, Math.PI, 0]}
          framed
        />
      );
      productImages.push(productImage);
      positionOffset++;
    });
  }
  console.log(productImages);

  return (
    <group position={position} rotation={rotation}>
      {productImages}
    </group>
  );
};

export default Shop;
