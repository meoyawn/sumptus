import React, { ComponentProps } from "react"

import {
  Alert,
  Box,
  Code,
  Divider,
  Heading,
  Kbd,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList
} from "@chakra-ui/core"

export default {
  h1: (props: unknown) => <Heading as='h1' size='2xl' {...props} />,
  h2: (props: unknown) => <Heading as='h2' size='xl' {...props} />,
  h3: (props: unknown) => <Heading as='h3' size='lg' {...props} />,
  h4: (props: unknown) => <Heading as='h4' size='md' {...props} />,
  h5: (props: unknown) => <Heading as='h5' size='sm' {...props} />,
  h6: (props: unknown) => <Heading as='h6' size='xs' {...props} />,

  hr: (props: ComponentProps<any>) => <Divider {...props} />,
  strong: (props: ComponentProps<any>) => <Box as="strong" fontWeight="semibold" {...props} />,
  code: Code,
  kbd: Kbd,
  br: (props: ComponentProps<any>) => <Box {...props} />,
  a: (props: ComponentProps<any>) => <Link {...props} />,
  p: (props: unknown) => <Text as={"p"} {...props} />,
  ul: (props: ComponentProps<any>) => <UnorderedList  {...props} />,
  ol: (props: ComponentProps<any>) => <OrderedList  {...props} />,
  li: (props: ComponentProps<any>) => <ListItem  {...props} />,
  blockquote: (props: ComponentProps<any>) => <Alert {...props} />,
}
