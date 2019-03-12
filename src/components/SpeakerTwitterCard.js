import React from "react"
import styled from "@emotion/styled"
import { rgba } from "polished"

const Card = styled("div")`
  position: relative;
  border: 1px solid #000;
`

const Name = styled("h2")`
  position: absolute;
  border: 1px solid #000;
`

function SpeakerTwitterCard({ contact, theme }) {
  const { width, height } = theme.size
  const { position, style, size, fill } = theme.elements[0]
  const { r, g, b, a } = fill
  const color = rgba(r * 255, g * 255, b * 255, a)
  const relativeX = position.x - theme.position.x
  const relativeY = position.y - theme.position.y
  return (
    <Card css={{ width, height, background: 'url(https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/26c5/2826/27d33ae92796ce7b60c511b086a00750)' }}>
      <Name
        css={{
          ...style,
          left: relativeX,
          top: relativeY,
          width: size.width,
          color,
        }}
      >
        {contact.name}
      </Name>
    </Card>
  )
}

export default SpeakerTwitterCard
