import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Environment = dynamic(import("environments/PlayerEnvironment"), {
  ssr: false,
});
const Narrative = dynamic(import("scenes/Narrative"), { ssr: false });

const NarrativePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Narrative Space</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment scene={Narrative} />
    </>
  );
};

export default NarrativePage;
