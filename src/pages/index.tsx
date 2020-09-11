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
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment
        scene={Outside}
        artist="Lucid Monday"
        link="https://lucidmonday.com"
      />
    </>
  );
};

export default BroadwayPage;
