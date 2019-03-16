import React from "react"
import styled from "@emotion/styled"
import { rgba } from "polished"
import { Query } from "urql"
import gql from "graphql-tag"
import GoogleFontLoader from "react-google-font-loader"
import { LastModifiedContext } from "./layout"

const NodeWrapper = styled("div")`
  position: absolute;
`

const getFigmaNode = gql`
  query FigmaTextNodeQuery(
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
          children(type: TEXT, name: $nodeName) {
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
      }
    }
  }
`

export default function FigmaTextNode({
  fileId,
  pageName,
  nodeName,
  children,
}) {
  return (
    <LastModifiedContext.Consumer>
      {lastModified => (
        <Query
          query={getFigmaNode}
          variables={{
            fileId,
            pageName,
            nodeName,
            lastModified,
          }}
        >
          {({ fetching, data, error }) => {
            if (error) {
              console.error(error)
              return "Oh no!"
            } else if (!data) {
              return null
            }

            const theme = data.file.pages[0].frames[0]
            const { position, style, size, fill } = theme.children[0]
            const { r, g, b, a } = fill
            const color = rgba(r * 255, g * 255, b * 255, a)
            const relativeX = position.x - theme.position.x
            const relativeY = position.y - theme.position.y
            const { fontFamily, fontWeight } = style

            return (
              <>
                <GoogleFontLoader
                  fonts={[
                    {
                      font: fontFamily,
                      weights: [fontWeight],
                    },
                  ]}
                />
                <NodeWrapper
                  css={{
                    ...style,
                    ...size,
                    lineHeight: `${style.lineHeightPx}px`,
                    left: relativeX,
                    top: relativeY,
                    color,
                  }}
                >
                  {children}
                </NodeWrapper>
              </>
            )
          }}
        </Query>
      )}
    </LastModifiedContext.Consumer>
  )
}
