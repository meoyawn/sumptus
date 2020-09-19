import React from "react";
import { GetStaticProps } from "next";
import { Text, Wrap } from "@chakra-ui/core";
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

const mkPost = (name: string) =>
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
  return { props: { posts } }
}

export default function Index({ posts }: Props): JSX.Element {
  const blue = "blue.500"

  return (
    <div>
      {posts.map(({ slug, title, date }) => (
        <Wrap key={slug} align="center">
          <InternalLink href="/blog/[slug]" as={`/blog/${slug}`} color={blue}>
            <Text fontSize="2xl" fontWeight="bold" color={blue}>
              {title}
            </Text>
          </InternalLink>
          <Text color="gray.600" fontSize="sm">
            {format(date, "d MMM y")}
          </Text>
        </Wrap>
      ))}
    </div>
  )
}
