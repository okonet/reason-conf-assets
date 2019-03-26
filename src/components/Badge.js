import React from "react"
import { File, Frame, Text } from "react-figma-primitives"

function Badge({ contact }) {
  const [firstName, lastName] = contact.name.split(" ")
  return (
    <File fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge">
      {({ data }) =>
        console.log(data) || (
          <>
            <h3>Last modified: {data.file.lastModified}</h3>
            <Frame nodeName="Export">
              <Text nodeName="firstName">{firstName}</Text>
              <Text nodeName="lastName">{lastName}</Text>
              <Text nodeName="companyName">
                {contact.company || "Freelance"}
              </Text>
            </Frame>
          </>
        )
      }
    </File>
  )
}

export default Badge
