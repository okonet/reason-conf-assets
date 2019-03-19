import React from "react"
import styled from "styled-components"
import { rgba } from "polished"
import gql from "graphql-tag"
import GoogleFontLoader from "react-google-font-loader"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"

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
            const theme = data.file.pages[0].frames[0]
            const { position, style, size, fill, visible } = theme.children[0]
            const { r, g, b, a } = fill
            const color = rgba(r * 255, g * 255, b * 255, a)
            const relativeX = position.x - theme.position.x
            const relativeY = position.y - theme.position.y
            const { fontFamily, fontWeight } = style

            if (!visible) {
              return null
            }

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
        </FigmaQuery>
      )}
    </LastModifiedContext.Consumer>
  )
}
