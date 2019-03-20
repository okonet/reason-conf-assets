import React from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"

const NodeWrapper = styled("div")`
  position: relative;
`

export const childrenFragment = gql`
  fragment ChildrenOfName on Frame {
    children(name: $nodeName) {
      ... on Frame {
        id
        position {
          x
          y
        }
        size {
          width
          height
        }
      }
      ... on Text {
        name
        visible
        position {
          x
          y
        }
        size {
          width
          height
        }
        style {
          fontSize
          fontFamily
          fontWeight
          letterSpacing
          lineHeightPx
        }
        fill {
          r
          g
          b
          a
        }
      }
    }
  }
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
          name
          position {
            x
            y
          }
          size {
            width
            height
          }
          ...ChildrenOfName
        }
      }
    }
  }

  ${childrenFragment}
`

const getImagesOfNode = gql`
  query FigmaImageOfNodeQuery($fileId: ID!, $nodeIds: [ID]) {
    image(id: $fileId, params: { ids: $nodeIds, format: "svg" }) {
      images
    }
  }
`

export default function FigmaFrame({ fileId, pageName, nodeName, children }) {
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
            const { size } = frame
            const { id } = frame.children[0]

            return (
              <NodeWrapper
                css={{
                  ...size,
                }}
              >
                <FigmaQuery
                  query={getImagesOfNode}
                  variables={{
                    fileId,
                    nodeIds: id,
                    lastModified,
                  }}
                >
                  {({ data }) => {
                    return (
                      <NodeWrapper
                        css={{
                          ...size,
                          background: `url(${data.image.images[0]})`,
                        }}
                      >
                        {children}
                      </NodeWrapper>
                    )
                  }}
                </FigmaQuery>
              </NodeWrapper>
            )
          }}
        </FigmaQuery>
      )}
    </LastModifiedContext.Consumer>
  )
}
