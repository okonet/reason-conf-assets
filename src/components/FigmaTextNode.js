import React from "react"
import styled from "styled-components"
import { rgba } from "polished"
import GoogleFontLoader from "react-google-font-loader"
import { LastModifiedContext } from "./layout"
import FigmaQuery from "./FigmaQuery"
import { FIGMA_FILE_QUERY } from "./FigmaFile"

const NodeWrapper = styled("div")`
  position: absolute;
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
          query={FIGMA_FILE_QUERY}
          variables={{
            fileId,
            pageName,
            nodeName,
            lastModified,
          }}
        >
          {({ data }) => {
            const theme = data.file.pages[0].frames[0]
            if (!theme.children.length) {
              console.warn(
                `No children returned from the query. Check if Figma file has a corresponding layer with name ${nodeName}`
              )
              return null
            }
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
