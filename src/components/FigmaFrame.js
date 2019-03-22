import React from "react"
import styled from "styled-components"
import FigmaQuery from "./FigmaQuery"

const NodeWrapper = styled("div")`
  position: relative;
`

export default function FigmaFrame({ nodeName, children }) {
  return (
    <FigmaQuery
      variables={{
        nodeName,
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
