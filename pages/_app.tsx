import './bulma.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function MainApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
