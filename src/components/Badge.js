import React from "react"
import FigmaTextNode from "./FigmaTextNode"
import FigmaFrame from "./FigmaFrame"
import FigmaFile from "./FigmaFile"

function Badge({ contact }) {
  const [firstName, lastName] = contact.name.split(" ")
  return (
    <FigmaFile fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge">
      {({ data }) => (
        <>
          <h3>Last modified: {data.file.lastModified}</h3>
          <FigmaFrame nodeName="Export">
            <FigmaTextNode nodeName="firstName">{firstName}</FigmaTextNode>
            <FigmaTextNode nodeName="lastName">{lastName}</FigmaTextNode>
            <FigmaTextNode nodeName="companyName">
              {contact.company || "Freelance"}
            </FigmaTextNode>
          </FigmaFrame>
        </>
      )}
    </FigmaFile>
  )
}

export default Badge
