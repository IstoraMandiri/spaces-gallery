import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Environment = dynamic(import("core/Environment"), { ssr: false });
const Chad = dynamic(import("scenes/Chad"), { ssr: false });

const ChadPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chad Knight | Spaces Gallery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment
        scene={Chad}
        artist="Harris Cole"
        title="Virtual Genesis by Chad Knight"
        link="https://www.instagram.com/_harris.cole/"
      />
    </>
  );
};

export default ChadPage;
