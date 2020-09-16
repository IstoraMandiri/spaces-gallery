import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Environment = dynamic(import("core/Environment"), { ssr: false });
const Shop = dynamic(import("scenes/Shop"), { ssr: false });

const ChadPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery - Shop</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment scene={Shop} />
    </>
  );
};

export default ChadPage;
