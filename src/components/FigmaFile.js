import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const FIGMA_FILE_QUERY = gql`
  query figmaFileQuery($fileId: ID!) {
    file(id: $fileId) {
      version
      lastModified
    }
  }
`

const FIGMA_FILE_SUBSCRIPTION = gql`
  subscription onFigmaFileUpdated($fileId: ID!) {
    file(id: $fileId) {
      version
      lastModified
    }
  }
`

function FigmaFile({ fileId, children }) {
  return (
    <Query query={FIGMA_FILE_QUERY} variables={{ fileId }}>
      {({ loading, data, error, subscribeToMore }) => {
        if (error) {
          console.error(error)
          return "Oh no!"
        } else if (loading) {
          return "Loading..."
        } else if (!data) {
          return null
        }
        const subscribeToFileUpdates = () =>
          subscribeToMore({
            document: FIGMA_FILE_SUBSCRIPTION,
            variables: { fileId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newFile = subscriptionData.data
              console.log("Figma file updated!")
              return newFile
            },
          })

        subscribeToFileUpdates()

        return children({ data })
      }}
    </Query>
  )
}

export default FigmaFile
