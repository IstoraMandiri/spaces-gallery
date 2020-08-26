import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
const Environment = dynamic(import("core/Environment"), { ssr: false });
const Outside = dynamic(import("scenes/Outside"), { ssr: false });

const BroadwayPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
      </Head>
      <Environment scene={Outside} />
    </>
  );
};

export default BroadwayPage;
