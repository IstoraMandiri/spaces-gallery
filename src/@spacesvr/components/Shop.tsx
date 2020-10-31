import React from "react";
import { useShopify } from "@spacesvr/services/shopify";
import Image from "@spacesvr/components/Image";
import { Raycaster } from "three";
const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

type ShopProps = {
  domain?: string;
  token?: string;
  localProducts?: string[];
  links?: string[];
  raycaster?: React.MutableRefObject<Raycaster>;
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
    localProducts,
    links,
    raycaster,
    itemSize = 4,
    itemRatio = [1, 1],
    spaceBetween = 9,
    position = [-9, 4, 0],
    rotation = [0, Math.PI / 9, 0],
  } = props;
  const productImages: any[] = [];
  let positionOffset = 0;
  let offset = 0;
  let linkIndex = 0;
  if (localProducts) {
    for (const product of localProducts) {
      const productImage = (
        <Image
          src={product}
          ratio={itemRatio}
          sizeScale={itemSize}
          position={[
            Math.cos(offset) * 19 + spaceBetween,
            2,
            Math.sin(offset) * 19,
          ]}
          rotation={[0, Math.PI / 2 - offset + Math.PI, 0]}
          link={links ? links[linkIndex] : undefined}
          raycaster={raycaster ? raycaster : undefined}
          framed
        />
      );
      productImages.push(productImage);
      offset += (2 * Math.PI) / 9;
      positionOffset++;
      linkIndex++;
    }
    return (
      <group position={position} rotation={rotation}>
        {productImages}
      </group>
    );
  }
  let shopifyState;
  if (domain && token) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    shopifyState = useShopify({
      domain: domain,
      token: token,
    });
  }
  // @ts-ignore
  const { products } = shopifyState;
  if (products) {
    // @ts-ignore
    products.forEach((product) => {
      if (product.images[0]) {
        const src = product.images[0].src;
        const productImage = (
          <Image
            src={src}
            ratio={itemRatio}
            sizeScale={itemSize}
            position={[spaceBetween * positionOffset, 2, 0]}
            rotation={[0, Math.PI, 0]}
            framed
            link={links ? links[linkIndex] : undefined}
          />
        );
        productImages.push(productImage);
        positionOffset++;
        linkIndex++;
      }
    });
  }

  return (
    <group position={position} rotation={rotation}>
      {productImages}
    </group>
  );
};

export default Shop;
