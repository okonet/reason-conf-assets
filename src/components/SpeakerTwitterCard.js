import React from "react"
import styled from "@emotion/styled"
import FigmaTextNode from "./FigmaTextNode"

const Card = styled("div")`
  position: relative;
`

function SpeakerTwitterCard({ contact, theme, images }) {
  const { width, height } = theme.size
  const [firstName, lastName] = contact.name.split(' ')
  return (
    <Card css={{ width, height, background: `url(${images[0]})` }}>
      <FigmaTextNode fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge" nodeName="firstName">
        {firstName}
      </FigmaTextNode>
      <FigmaTextNode fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge" nodeName="lastName">
        {lastName}
      </FigmaTextNode>
      <FigmaTextNode fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge" nodeName="companyName">
        {contact.company || 'Freelance'}
      </FigmaTextNode>
    </Card>
  )
}

export default SpeakerTwitterCard
