import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

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
      <Chad />
    </>
  );
};

export default ChadPage;
