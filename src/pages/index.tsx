import React from "react"
import { Heading, Stack } from "@chakra-ui/core";
import { GetStaticProps } from "next";

import { mkPost, Post, PostLink } from "./blog";
import { mdNames, readMD } from "../util/cms";

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
      <Heading as="h2" size='xl'>Recent</Heading>

      {posts.map(post => <PostLink key={post.slug} {...post} />)}
    </Stack>
  )
}
