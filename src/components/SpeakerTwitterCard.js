import React from "react"
import { File, Frame, Group, Text } from "react-figma-primitives"
import SpeakerImage from "./SpeakerImage"

function SpeakerTwitterCard({ contact }) {
  return (
    <File fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Speaker Teaser">
      {() => (
        <Frame nodeName="bg">
          <Group nodeName="speakerImage">
            <SpeakerImage speaker={contact} />
          </Group>
          <Text nodeName="speakerName">{contact.name}</Text>
          <Text nodeName="speakerCompany">
            {contact.company || "Freelance"}
          </Text>
          {contact.talks && (
            <Text nodeName="talkTitle">{contact.talks[0].title}</Text>
          )}
        </Frame>
      )}
    </File>
  )
}

export default SpeakerTwitterCard
