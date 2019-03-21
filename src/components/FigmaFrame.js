import React from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import FigmaQuery from "./FigmaQuery"
import { FIGMA_FILE_QUERY } from "./FigmaFile"

const NodeWrapper = styled("div")`
  position: relative;
`

const getImagesOfNode = gql`
  query FigmaImageOfNodeQuery($fileId: ID!, $nodeIds: [ID]) {
    image(id: $fileId, params: { ids: $nodeIds, scale: 2, format: "png" }) {
      images
    }
  }
`

export default function FigmaFrame({ fileId, pageName, nodeName, children }) {
  return (
    <FigmaQuery
      query={FIGMA_FILE_QUERY}
      variables={{
        fileId,
        pageName,
        nodeName,
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
              }}
            >
              {({ data }) => {
                return (
                  <NodeWrapper
                    css={{
                      ...size,
                      background: `url(${data.image.images[0]})`,
                      backgroundSize: "cover",
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
  )
}
