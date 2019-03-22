import React from "react"
import FigmaTextNode from "./FigmaTextNode"
import FigmaFrame from "./FigmaFrame"
import SpeakerImage from "./SpeakerImage"
import FigmaGroup from "./FigmaGroup"
import FigmaFile from "./FigmaFile"

function SpeakerTwitterCard({ contact }) {
  return (
    <FigmaFile fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Speaker Teaser">
      {() => (
        <FigmaFrame nodeName="bg">
          <FigmaGroup nodeName="speakerImage">
            <SpeakerImage speaker={contact} />
          </FigmaGroup>
          <FigmaTextNode nodeName="speakerName">{contact.name}</FigmaTextNode>
          <FigmaTextNode nodeName="speakerCompany">
            {contact.company || "Freelance"}
          </FigmaTextNode>
          {contact.talks && (
            <FigmaTextNode nodeName="talkTitle">
              {contact.talks[0].title}
            </FigmaTextNode>
          )}
        </FigmaFrame>
      )}
    </FigmaFile>
  )
}

export default SpeakerTwitterCard
