import { useState } from "react";
import { useShopify } from "services/shopify";
import {
  Overlay,
  Exit,
  ProductDesc,
  Description,
  ProductImage,
  Sizes,
  SingleSize,
  Purchase,
  LeftSide,
  RightSide,
  Input,
  Form,
} from "./components/ShopOverlayStyles";

type ShopProps = {
  overlay: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShopOverlay = (props: ShopProps) => {
  const { overlay, setOverlay } = props;
  const [curVariantId, setCurVariantId] = useState<string>();
  const shopifyState = useShopify(); // /products/0/variants/available
  const { client, checkout, products } = shopifyState;
  const [username, setUsername] = useState("");

  if (!overlay || !products) {
    return <></>;
  }

  // @ts-ignore
  const { variants, images, description, title } = products[0];
  const closeOverlay = () => setOverlay(!overlay);
  const price = variants[0].price;

  const Checkout = async () => {
    if (!products || !curVariantId || !username) {
      return;
    }

    const itemsToAdd = {
      // @ts-ignore
      variantId: curVariantId,
      quantity: 1,
      customAttributes: [{ key: "instagram", value: username }],
    };
    const newCheckout1 = await client.checkout.addLineItems(
      // @ts-ignore
      checkout.id,
      itemsToAdd
    );

    window.location.href = newCheckout1.webUrl;
  };

  return (
    <Overlay>
      <LeftSide>
        <ProductImage src={images[0].src} />
      </LeftSide>
      <RightSide>
        <Exit onClick={closeOverlay}>X</Exit>
        <ProductDesc>
          <h3>{title.toUpperCase()}</h3>
          <h5>${price}</h5>
          <Description>{description}</Description>
        </ProductDesc>
        <Form>
          <Sizes>
            {/* @ts-ignore */}
            {variants.map(({ id, available, title }) => {
              if (title.includes("xxl")) {
                return <></>;
              }

              let name = title.substr(0, 1).toUpperCase();
              if (name === "X") {
                name = "XL";
              }

              return (
                <SingleSize
                  key={id}
                  onClick={() => setCurVariantId(id)}
                  selected={id === curVariantId}
                  available={available}
                  disabled={!available}
                >
                  {name}
                </SingleSize>
              );
            })}
          </Sizes>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Instagram Username"
          />
          <Purchase onClick={Checkout}>Purchase</Purchase>
        </Form>
      </RightSide>
    </Overlay>
  );
};

export default ShopOverlay;
