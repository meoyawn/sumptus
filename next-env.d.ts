/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-mdx-remote/render-to-string' {

  import React from "react";

  export default function renderToString(
    source: string,
    opts: {
      components: Record<string, React.FunctionComponent>
      mdxOptions?: Record<string, unknown>
      scope?: Record<string, unknown>
    }
  ): Promise<string>
}

declare module 'next-mdx-remote/hydrate' {

  import React from "react";

  export default function hydrate(
    source: string,
    opts: { components: Record<string, React.FunctionComponent> }
  ): React.ReactNode
}
