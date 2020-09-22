/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-mdx-remote/render-to-string' {

  export default function renderToString(
    source: string,
    opts: {
      components: Record<string, unknown>
      mdxOptions?: Record<string, unknown>
      scope?: Record<string, unknown>
    }
  ): Promise<string>
}

declare module 'next-mdx-remote/hydrate' {

  import React from "react";

  export default function hydrate(
    source: string,
    opts: { components: Record<string, unknown> }
  ): React.ReactNode
}
