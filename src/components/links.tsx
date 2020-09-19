import React, { PropsWithChildren } from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { Link as ChakraLink, LinkProps as ChakraLinkProps, } from "@chakra-ui/core"

export type NextChakraLinkProps = PropsWithChildren<NextLinkProps & Omit<ChakraLinkProps, "as">>

//  Has to be a new component because both chakra and next share the `as` keyword
export const InternalLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: NextChakraLinkProps): JSX.Element => (
  <NextLink
    passHref={true}
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
  >
    <ChakraLink {...chakraProps}>
      {children}
    </ChakraLink>
  </NextLink>
)
