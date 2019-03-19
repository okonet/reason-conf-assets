/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import { split } from "apollo-link"
import ApolloClient from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { BatchHttpLink } from "apollo-link-batch-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import Header from "./header"
import "./layout.css"

export const LastModifiedContext = React.createContext("")

const httpLink = new BatchHttpLink({
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
  cache: new InMemoryCache(),
})

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={({ site }) => (
        <ApolloProvider client={client}>
          <Header siteTitle={site.siteMetadata.title} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
            }}
          >
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </ApolloProvider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
