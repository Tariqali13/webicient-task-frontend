import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default function Document() {
  return (
    <Html>
      <Head>
        <link
          /* eslint-disable-next-line max-len */
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/admin-css/admin.css" />
        <link rel="stylesheet" href="/plugins/nucleo/css/nucleo.css" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
