/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
  Subscription,
  subscriptionExchange,
} from "urql"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { get } from "lodash"

import Header from "./header"
import "./layout.css"
import gql from "graphql-tag"

const LastModifiedSubQuery = gql`
  subscription lastModifiedSub {
    lastModified
  }
`

export const LastModifiedContext = React.createContext("")

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:3001/graphql",
  {}
)

const client = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [
    debugExchange,
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
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
      render={data => (
        <Provider value={client}>
          <Subscription query={LastModifiedSubQuery}>
            {res => (
              <LastModifiedContext.Provider
                value={get(res, "data.lastModified")}
              >
                <Header siteTitle={data.site.siteMetadata.title} />
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
              </LastModifiedContext.Provider>
            )}
          </Subscription>
        </Provider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
