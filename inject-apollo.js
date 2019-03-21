import React from "react"
import ApolloClient from "apollo-client"
import { ApolloProvider } from "react-apollo"
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"
import introspectionQueryResultData from "./fragmentTypes"

export default function injectProvider({ element }, {}) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({ fragmentMatcher })

  const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql",
  })

  const wsLink = new WebSocketLink({
    uri: "ws://localhost:3001/graphql",
    options: {
      reconnect: true,
    },
  })

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === "OperationDefinition" && operation === "subscription"
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    link,
    cache,
  })

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
