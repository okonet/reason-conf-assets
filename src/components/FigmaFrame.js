import React from "react"
import styled from "@emotion/styled"
import { Query } from "urql"
import gql from "graphql-tag"
import { LastModifiedContext } from "./layout"

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
          name
          position {
            x
            y
          }
          size {
            width
            height
          }
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
          }
        }
      }
    }
  }
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
        <Query
          query={getFigmaNode}
          variables={{
            fileId,
            pageName,
            nodeName,
            lastModified
          }}
        >
          {({ fetching, data, error }) => {
            if (error) {
              console.error(error)
              return "Oh no!"
            } else if (!data) {
              return null
            }

            const frame = data.file.pages[0].frames[0]
            const { size } = frame
            const { id } = frame.children[0]

            return (
              <NodeWrapper
                css={{
                  ...size,
                }}
              >
                <Query
                  query={getImagesOfNode}
                  variables={{
                    fileId,
                    nodeIds: id,
                    lastModified
                  }}
                >
                  {({ fetching, data, error }) => {
                    if (error) {
                      console.error(error)
                      return "Oh no!"
                    } else if (!data) {
                      return null
                    }

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
                </Query>
              </NodeWrapper>
            )
          }}
        </Query>
      )}
    </LastModifiedContext.Consumer>
  )
}
