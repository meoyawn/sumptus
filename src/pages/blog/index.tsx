import React from "react";
import { GetStaticProps } from "next";
import { Heading, Stack, Text, Wrap } from "@chakra-ui/core";
import { format } from "date-fns"

import { MD, mdNames, readMD } from "../../util/cms";
import { InternalLink } from "../../components/links";

export type Post = {
  slug: string
  title: string
  date: number
}

type Props = {
  posts: readonly Post[]
}

export const mkPost = (name: string) =>
  ({ data: { title, date } }: MD): Post => (
    {
      slug: name.replace(".mdx", ""),
      title: title as string,
      date: (date as Date).getTime(),
    }
  )

export const getStaticProps: GetStaticProps<Props> = async () => {
  const names = await mdNames()
  const posts = await Promise.all(names.map(name => readMD(name).then(mkPost(name))))
  return { props: { posts: posts.sort((a, b) => b.date - a.date) } }
}

const blue = "blue.500"

export const PostLink = ({ slug, title, date }: Post) => (
  <Wrap align="center">
    <InternalLink href="/blog/[slug]" as={`/blog/${slug}`} color={blue}>
      <Text fontSize="2xl" fontWeight="bold" color={blue}>
        {title}
      </Text>
    </InternalLink>

    <Text color="gray.600" fontSize="sm">
      {format(date, "d MMM y")}
    </Text>
  </Wrap>
)

export default function Index({ posts }: Props): JSX.Element {
  return (
    <Stack>
      <Heading as="h1" size={"2xl"}>Archive</Heading>

      {posts.map(post => <PostLink key={post.slug} {...post} />)}
    </Stack>
  )
}
