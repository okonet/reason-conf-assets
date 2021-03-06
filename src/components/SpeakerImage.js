import React from "react"
import styled from "styled-components"

const Picture = styled("picture")`
  position: relative;
  display: block;
  width: 100%;
  filter: drop-shadow(15px 15px 0px rgba(0, 0, 0, 0.25));

  img {
    display: block;
    margin: 0;
    padding: 0;
    clip-path: polygon(0 10px, 100% 0, 100% calc(100% - 10px), 0 100%);
    filter: grayscale(100%);
  }
`

function SpeakerImage({ speaker }) {
  return (
    <Picture>
      <img src={speaker.image.url} alt={speaker.name} />
    </Picture>
  )
}

export default SpeakerImage
