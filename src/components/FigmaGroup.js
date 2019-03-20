import React from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"
import { childrenFragment, rectFragment } from "./FigmaFrame"

const NodeWrapper = styled("div")`
  position: relative;
`

const getFigmaNode = gql`
  query FigmaFrameNodeQuery(
    $fileId: ID!
    $pageName: String!
    $nodeName: String!
  ) {
    file(id: $fileId) {
      pages(name: $pageName) {
        name
        frames {
          ...Rect
          ...ChildrenOfName
        }
      }
    }
  }

  ${rectFragment}
  ${childrenFragment}
`

export default function FigmaGroup({ fileId, pageName, nodeName, children }) {
  return (
    <LastModifiedContext.Consumer>
      {lastModified => (
        <FigmaQuery
          query={getFigmaNode}
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
