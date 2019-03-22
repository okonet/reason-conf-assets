import React from "react"
import styled from "styled-components"
import FigmaQuery from "./FigmaQuery"
import { FIGMA_FILE_QUERY } from "./FigmaFile"

const NodeWrapper = styled("div")`
  position: relative;
`

export default function FigmaFrame({ fileId, pageName, nodeName, children }) {
  return (
    <FigmaQuery
      query={FIGMA_FILE_QUERY}
      variables={{
        fileId,
        pageName,
        nodeName,
        format: "svg",
      }}
    >
      {({ data }) => {
        const frame = data.file.pages[0].frames[0]
        const { size } = frame
        const { image } = frame.children[0]

        return (
          <NodeWrapper
            css={{
              ...size,
              background: `url(${image})`,
              backgroundSize: "cover",
            }}
          >
            {children}
          </NodeWrapper>
        )
      }}
    </FigmaQuery>
  )
}
