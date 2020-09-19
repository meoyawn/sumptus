import React from "react";
import Document, { Head, Html, Main, NextScript } from 'next/document'

const icon16 = require('../images/icon.png?size=16')
const icon32 = require('../images/icon.png?size=32')
const icon192 = require('../images/icon.png?size=192')

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" href={icon192.src} />

          <link rel="icon" type="image/png" sizes="16x16" href={icon16.src} />
          <link rel="icon" type="image/png" sizes="32x32" href={icon32.src} />

          <link rel="manifest" href={process.env.MANIFEST} />

          {process.env.THEME_COLOR && <meta name="theme-color" content={process.env.THEME_COLOR} />}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
