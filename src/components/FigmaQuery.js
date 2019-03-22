import React from "react"
import { Query } from "react-apollo"
import { FigmaContext, FIGMA_FILE_QUERY } from "./FigmaFile"

function FigmaQuery({
  query,
  children,
  variables,
  fetchPolicy = "cache-first",
}) {
  return (
    <FigmaContext.Consumer>
      {({ fileId, pageName }) => (
        <Query
          query={FIGMA_FILE_QUERY}
          variables={{ fileId, pageName, ...variables }}
          fetchPolicy={fetchPolicy}
        >
          {({ loading, data, error }) => {
            if (error) {
              console.error(error)
              return "Oh no!"
            } else if (loading) {
              return "Loading..."
            } else if (!data) {
              return null
            }
            return children({ data })
          }}
        </Query>
      )}
    </FigmaContext.Consumer>
  )
}

export default FigmaQuery
