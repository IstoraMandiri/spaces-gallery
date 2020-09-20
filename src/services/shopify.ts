import { useEffect, useState } from "react";
// @ts-ignore
import ShopifyBuy from "shopify-buy";

const { NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS } = process.env;

const client = ShopifyBuy.buildClient({
  domain: "spaceslabs.myshopify.com",
  storefrontAccessToken: NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS,
});

export const useShopify = () => {
  const [products, setProducts] = useState();
  const [checkout, setCheckout] = useState();
  const [checkoutOpen, setCheckoutOpen] = useState("false");

  useEffect(() => {
    if (!products && !checkout) {
      client.product
        .fetchAll()
        // @ts-ignore
        .then((shopifyProducts) => setProducts(shopifyProducts));
      client.checkout
        .create()
        // @ts-ignore
        .then((shopifyCheckout) => setCheckout(shopifyCheckout));
    }
  }, [products, checkout]);

  return {
    client,
    products,
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen,
  };
};
