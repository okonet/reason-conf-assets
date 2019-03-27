import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"

const emptyBadges = 10
const emptyOrgBadges = 5
const badgesPerPage = 4 // Should be even!

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676"
  }
  if (props.isDragReject) {
    return "#ff1744"
  }
  if (props.isDragActive) {
    return "#6c6"
  }
  return "#666"
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${getColor};
  border-style: ${props => (props.isDragActive ? "solid" : "dashed")};
  background-color: ${props => (props.isDragActive ? "#eee" : "")};
`

const readFileContents = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async () => {
      resolve(reader.result)
    }
    reader.onabort = () => reject("file reading was aborted")
    reader.onerror = () => reject("file reading has failed")
    reader.readAsText(file, "utf-8")
  })
}

const getEmptyData = type => ({
  firstName: null,
  lastName: null,
  company: null,
  type,
  twitter: null,
})

const getType = type => {
  switch (type) {
    case "Organizer": {
      return "Organizer"
    }
    case "Volunteer": {
      return "Volunteer"
    }
    default:
      return "Attendee"
  }
}

const convertData = data => {
  const validTickets = data.filter(t => !t["Void Status"])
  // Ensure all pages are filled with badges
  const emptyBadgesFill =
    badgesPerPage -
    ((validTickets.length + emptyBadges + emptyOrgBadges) % badgesPerPage)
  return validTickets
    .map(i => ({
      firstName: i["Ticket First Name"],
      lastName: i["Ticket Last Name"],
      company:
        i["Ticket Company Name"] &&
        (!i["Ticket Full Name"].includes(i["Ticket Company Name"]) &&
          !i["Ticket Company Name"].includes(i["Ticket Full Name"]))
          ? i["Ticket Company Name"]
          : null, // Remove company if it's same as the name
      type: getType(i["Ticket"]),
      twitter: i["Tags"] ? `@${i["Tags"]}` : null,
    }))
    .concat(Array(emptyOrgBadges).fill(getEmptyData("Volunteer")))
    .concat(Array(emptyBadges + emptyBadgesFill).fill(getEmptyData("Attendee")))
}

export default function Dropzone(props) {
  const [tickets, setTickets] = useState([])

  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles.length) {
      const csv = acceptedFiles[0]
      const content = await readFileContents(csv)
      const { data } = await Papa.parse(content, { header: true })
      setTickets(convertData(data))
    }
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ ...props, onDrop })

  return tickets.length === 0 ? (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drop ti.to CSV file here...</p>
    </Container>
  ) : (
    props.children({ tickets })
  )
}
