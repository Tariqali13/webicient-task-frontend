import React from 'react';
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";


const SecureHead = (props) => {
  const { title } = props;
  return (
    <Head>
      <title>{title ? `${title} | ` : ''}Webicient</title>
    </Head>
  );
};

export { SecureHead };