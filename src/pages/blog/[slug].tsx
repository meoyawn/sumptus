// server
import renderToString from 'next-mdx-remote/render-to-string'

import { mdNames, readMD } from "../../util/cms";

// client
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from 'next-mdx-remote/hydrate'

import MDXComponents from "../../components/MDXComponents"

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
  frontMatter: Record<string, unknown>
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params) throw Error("you lose")

  const { data, content } = await readMD(`${params.slug}.mdx`)
  const mdx = await renderToString(content, { components })

  return {
    props: {
      mdx,
      frontMatter: data,
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default function Slug({ mdx, frontMatter }: Props): JSX.Element {
  const content = hydrate(mdx, { components })

  return (
    <>
      {content}
    </>
  )
}
