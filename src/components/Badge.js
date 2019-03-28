import React from "react"
import { Frame, Text } from "react-figma-primitives"
import Stack from "stack-styled"

function Badge({ contact }) {
  const { firstName, lastName, company, twitter, type } = contact
  const stylesOverride = {
    position: "relative",
    top: "auto",
    left: "auto",
    width: "auto",
    height: "auto",
  }
  return (
    <Frame frameName={type} nodeName="Export">
      <Stack
        css={{
          position: "relative",
          top: 230,
          margin: 30,
        }}
      >
        <Text nodeName="firstName" styles={stylesOverride}>
          {firstName}
        </Text>
        <Text nodeName="lastName" styles={stylesOverride}>
          {lastName}
        </Text>
        <Text
          nodeName="companyName"
          styles={{ ...stylesOverride, marginTop: "1em" }}
        >
          {twitter || company}
        </Text>
      </Stack>
    </Frame>
  )
}

export default Badge
