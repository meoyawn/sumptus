import React, { useEffect } from "react"
import { AppProps } from 'next/app'
import { initialize as analyticsInit, pageview } from 'react-ga'

import { ChakraProvider, Container, theme } from "@chakra-ui/core"
import { merge } from "@chakra-ui/utils"

const customTheme = merge(theme, {
  // Extend the theme to include custom colors, fonts, etc.
})

const googleAnalytics = process.env.NEXT_PUBLIC_GA

// noinspection JSUnusedGlobalSymbols
export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

  if (googleAnalytics) {
    useEffect(() => {
      analyticsInit(googleAnalytics)
      pageview(window.location.pathname)
      router.events.on('routeChangeComplete', pageview)
      return () => router.events.off('routeChangeComplete', pageview)
    }, [])
  }

  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Container
        maxW="xl"
        py={3}
      >
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}
