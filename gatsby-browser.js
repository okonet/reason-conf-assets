/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
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
import { persistCache } from "apollo-cache-persist"
import introspectionQueryResultData from "./fragmentTypes"

export function wrapRootElement({ element }, {}) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({ fragmentMatcher })

  persistCache({
    cache,
    storage: window.localStorage,
    debug: true,
  })

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
