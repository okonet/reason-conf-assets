import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
  subscriptionExchange,
} from 'urql';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { SubscriptionClient } from "subscriptions-transport-ws"
import Badge from "../components/Badge"

const subscriptionClient = new SubscriptionClient(
  'ws://localhost:3001/graphql',
  {}
);

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [
    debugExchange,
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const SecondPage = () => (
  <Provider value={client}>
    <Layout>
      <SEO title="Badge" />
      <h1>Badge</h1>
      <Link to="/">Go back to the homepage</Link>
      <StaticQuery
        query={graphql`
          {
            data {
              contact(
                contactName: "Andrey Okonetchnikov"
                conferenceId: "react-finland-2019"
              ) {
                name
                about
                company
                image {
                  url
                }
                talks {
                  title
                }
                type
              }
            }
          }
        `}
        render={data => (
          <>
              <h1>test</h1>

            <Badge
              contact={data.data.contact}
            />
          </>
        )}
      />
    </Layout>
  </Provider>
)

export default SecondPage
