import React from "react";
import { GetStaticProps } from "next";

import { mdNames, readMD } from "../../util/cms";

type Props = {}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const names = await mdNames()
  const mds = await Promise.all(names.map(readMD))
  return {
    props: {}
  }
}

export default function Index(props: Props): JSX.Element {
  return (
    <div>
      Foo
    </div>
  )
}
