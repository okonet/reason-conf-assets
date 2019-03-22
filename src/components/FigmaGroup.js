import React from "react"
import styled from "styled-components"
import FigmaQuery from "./FigmaQuery"

const NodeWrapper = styled("div")`
  position: relative;
`

export default function FigmaGroup({ nodeName, children }) {
  return (
    <FigmaQuery
      variables={{
        nodeName,
      }}
    >
      {({ data }) => {
        const frame = data.file.pages[0].frames[0]
        const { size, position } = frame.children[0]

        return (
          <NodeWrapper
            css={{
              ...size,
              top: position.y,
              left: position.x,
            }}
          >
            {children}
          </NodeWrapper>
        )
      }}
    </FigmaQuery>
  )
}
