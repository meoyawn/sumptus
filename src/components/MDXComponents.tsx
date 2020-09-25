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
  UnorderedList,
} from "@chakra-ui/core"
import TweetEmbed from 'react-tweet-embed'

import Bootstrapping from "./Bootstrapping";

export default {
  a(props: unknown): JSX.Element {
    return (
      <Link
        color="blue.400"
        _hover={{ color: "blue.600" }}
        textDecoration="underline"

        target="_blank"
        rel="noreferrer"

        {...props}
      />
    )
  },
  blockquote(props: unknown): JSX.Element {
    return <Alert variant="left-accent" maxWidth="2xl" {...props} />
  },
  br(props: unknown): JSX.Element {
    return <Box as="br" height={24} {...props} />;
  },
  code: Code,
  h1(props: unknown): JSX.Element {
    return <Heading as='h1' size='2xl' {...props} />
  },
  h2(props: unknown): JSX.Element {
    return <Heading as='h2' size='xl' {...props} />
  },
  h3(props: unknown): JSX.Element {
    return <Heading as='h3' size='lg' {...props} />
  },
  h4(props: unknown): JSX.Element {
    return <Heading as='h4' size='md' {...props} />
  },
  h5(props: unknown): JSX.Element {
    return <Heading as='h5' size='sm' {...props} />
  },
  h6(props: unknown): JSX.Element {
    return <Heading as='h6' size='xs' {...props} />
  },
  hr: Divider,
  img: Image,
  kbd: Kbd,
  li: ListItem,
  ol: OrderedList,
  p(props: unknown): JSX.Element {
    return <Text maxWidth="2xl" as="p" fontSize="lg" my={2} {...props} />
  },
  strong(props: Record<string, unknown>): JSX.Element {
    return <strong {...props} />
  },
  ul: UnorderedList,

  Bootstrapping: Bootstrapping,
  TweetEmbed: TweetEmbed,
}
