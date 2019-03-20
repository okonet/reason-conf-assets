import React from "react"
import styled from "styled-components"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"
import { FIGMA_FILE_QUERY } from "./FigmaFile"

const NodeWrapper = styled("div")`
  position: relative;
`

export default function FigmaGroup({ fileId, pageName, nodeName, children }) {
  return (
    <LastModifiedContext.Consumer>
      {lastModified => (
        <FigmaQuery
          query={FIGMA_FILE_QUERY}
          variables={{
            fileId,
            pageName,
            nodeName,
            lastModified,
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
      )}
    </LastModifiedContext.Consumer>
  )
}
