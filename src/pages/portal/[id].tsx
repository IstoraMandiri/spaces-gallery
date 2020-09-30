import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const ShirtsEnvironment = dynamic(import("core/ShirtsEnvironment"), {
  ssr: false,
});
const Shirts = dynamic(import("scenes/Shirts"), { ssr: false });

const ShirtsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shirts Knight | Spaces Gallery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ShirtsEnvironment scene={Shirts} />
    </>
  );
};

export default ShirtsPage;
