import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Starter = dynamic(import("scenes/Starter"), { ssr: false });

const StarterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Starter />
    </>
  );
};

export default StarterPage;
