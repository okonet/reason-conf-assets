import React from "react"
import { Query } from "react-apollo"

function FigmaQuery({
  query,
  children,
  variables,
  fetchPolicy = "cache-first",
}) {
  return (
    <Query query={query} variables={variables} fetchPolicy={fetchPolicy}>
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
  )
}

export default FigmaQuery
