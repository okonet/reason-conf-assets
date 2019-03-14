import React from "react"
import styled from "@emotion/styled"
import { rgba } from "polished"
import { get } from "lodash"
import { Query, useSubscription } from "urql"
import gql from "graphql-tag"

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

const LastModifiedSubQuery = gql`
  subscription lastModifiedSub {
    lastModified
  }
`

export default function FigmaTextNode({
  fileId,
  pageName,
  nodeName,
  children,
}) {
  const handleSubscription = (messages = [], response) => {
    return response
  }

  const [res] = useSubscription(
    { query: LastModifiedSubQuery, variables: { fileId } },
    handleSubscription
  )

  return (
    <Query
      query={getFigmaNode}
      variables={{
        fileId,
        pageName,
        nodeName,
        lastModified: get(res, "data.lastModified"),
      }}
    >
      {({ fetching, data, error }) => {
        // console.log(data)
        if (fetching) {
          return "Loading..."
        } else if (error) {
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

        return (
          <NodeWrapper
            css={{
              ...style,
              left: relativeX,
              top: relativeY,
              width: size.width,
              color,
            }}
          >
            {children}
          </NodeWrapper>
        )
      }}
    </Query>
  )
}
