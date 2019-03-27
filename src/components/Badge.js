import React from "react"
import { Frame, Text } from "react-figma-primitives"

function Badge({ contact }) {
  const { firstName, lastName, company } = contact
  return (
    <Frame nodeName="Export">
      <Text nodeName="firstName">{firstName}</Text>
      <Text nodeName="lastName">{lastName}</Text>
      <Text nodeName="companyName">{company}</Text>
    </Frame>
  )
}

export default Badge
