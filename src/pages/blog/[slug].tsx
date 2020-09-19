// server
import renderToString from 'next-mdx-remote/render-to-string'
import { mdNames, readMD } from "../../util/cms";

// client
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from 'next-mdx-remote/hydrate'
import { Heading, Stack } from '@chakra-ui/core';

import MDXComponents from "../../components/MDXComponents"
import { Post } from "./index";

const components = MDXComponents

type Params = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const names = await mdNames()
  return {
    paths: names.map(name => ({ params: { slug: name.replace(".mdx", "") } })),
    fallback: false,
  }
}

type Props = {
  mdx: string
  post: Post
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params) throw Error("you lose")

  const { data, content } = await readMD(`${params.slug}.mdx`)
  const mdx = await renderToString(content, { components })


  return {
    props: {
      mdx,
      post: {
        slug: params.slug,
        title: data.title as string,
        date: (data.date as Date).getTime(),
      },
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default function Slug({ mdx, post }: Props): JSX.Element {
  const content = hydrate(mdx, { components })

  return (
    <Stack>
      <Heading as={"h1"} size={"2xl"}>{post.title}</Heading>
      {content}
    </Stack>
  )
}
