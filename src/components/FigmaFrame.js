import React from "react"
import styled from "styled-components"
import gql from "graphql-tag"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"
import { FIGMA_FILE_QUERY } from "./FigmaFile"

const NodeWrapper = styled("div")`
  position: relative;
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
