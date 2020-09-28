import React from "react"
import { Heading, Stack } from "@chakra-ui/core";
import { GetStaticProps } from "next";

import { mkPost, Post } from "./blog";
import { mdNames, readMD } from "../util/cms";
import { InternalLink } from "../components/links";

type Props = {
  posts: readonly Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const names = await mdNames()
  const posts = await Promise.all(names.map(name => readMD(name).then(mkPost(name))))
  return {
    props: {
      posts: posts.sort((a, b) => b.date - a.date)
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default function Index({ posts }: Props): JSX.Element {
  return (
    <Stack>
      <Heading as="h1" size='2xl'>An Experiment in Finance</Heading>
      <Heading as="h2" size='xl'>Tools</Heading>
      <InternalLink
        href={"/tool/retirement"}
        color={"blue.500"}
      >Retirement Calculator</InternalLink>
      <InternalLink
        href={"/tool/bootstrapping"}
        color={"blue.500"}
      >Bootstrapping Calculator</InternalLink>
    </Stack>
  )
}
