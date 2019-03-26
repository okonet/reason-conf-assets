import React from "react"
// import Text from "./Text"
// import Frame from "./Frame"
// import Group from "./Group"
// import File from "./File"
import { File, Frame, Group, Text } from "react-figma-primitives"
import SpeakerImage from "./SpeakerImage"

function SpeakerSlide({ contact }) {
  return (
    <File fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Slide">
      {() => (
        <Frame nodeName="bg">
          <Group nodeName="speakerImage">
            <SpeakerImage speaker={contact} />
          </Group>
          <Text nodeName="speakerName">{contact.name}</Text>
          {contact.talks && (
            <Text nodeName="talkTitle">{contact.talks[0].title}</Text>
          )}
        </Frame>
      )}
    </File>
  )
}

export default SpeakerSlide
