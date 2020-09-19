import React from "react"

import {
  Alert,
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Kbd,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList
} from "@chakra-ui/core"

import Bootstrap from "./Bootstrap";

export default {
  a: Link,
  blockquote: Alert,
  br: (props: unknown) => <Box as="br" height={24} {...props} />,
  code: Code,
  h1: (props: unknown) => <Heading as='h1' size='2xl' {...props} />,
  h2: (props: unknown) => <Heading as='h2' size='xl' {...props} />,
  h3: (props: unknown) => <Heading as='h3' size='lg' {...props} />,
  h4: (props: unknown) => <Heading as='h4' size='md' {...props} />,
  h5: (props: unknown) => <Heading as='h5' size='sm' {...props} />,
  h6: (props: unknown) => <Heading as='h6' size='xs' {...props} />,
  hr: Divider,
  img: Image,
  kbd: Kbd,
  li: ListItem,
  ol: OrderedList,
  p: (props: unknown) => <Text as="p" {...props} />,
  strong: (props: unknown) => <Box as="strong" fontWeight="semibold" {...props} />,
  ul: UnorderedList,

  Bootstrap: Bootstrap,
}
