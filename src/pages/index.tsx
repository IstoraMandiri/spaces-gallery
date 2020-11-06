import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Opening = dynamic(import("scenes/Opening"), { ssr: false });

const OpeningPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
      </Head>
      <Opening />
    </>
  );
};

export default OpeningPage;
