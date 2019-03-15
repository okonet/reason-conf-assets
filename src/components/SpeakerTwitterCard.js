import React from "react"
import FigmaTextNode from "./FigmaTextNode"
import FigmaImageMask from "./FigmaImageMask"
import FigmaFrame from "./FigmaFrame"

function SpeakerTwitterCard({ contact }) {
  return (
    <FigmaFrame fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Speaker Teaser" nodeName="bg">
      <FigmaTextNode fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Speaker Teaser" nodeName="speakerName">
        {contact.name}
      </FigmaTextNode>
      <FigmaTextNode fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Speaker Teaser" nodeName="speakerCompany">
        {contact.company || 'Freelance'}
      </FigmaTextNode>
    </FigmaFrame>
  )
}

export default SpeakerTwitterCard
