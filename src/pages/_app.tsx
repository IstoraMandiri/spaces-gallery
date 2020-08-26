import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "tailwindcss/dist/base.min.css";
import "styles/global.min.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=NmaYkayg80"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=NmaYkayg80"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=NmaYkayg80"
      />
      <link rel="manifest" href="/site.webmanifest?v=NmaYkayg80" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg?v=NmaYkayg80"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon.ico?v=NmaYkayg80" />
      <meta name="apple-mobile-web-app-title" content="AWGE" />
      <meta name="application-name" content="AWGE" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
