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
import SpeakerTwitterCard from "../components/SpeakerTwitterCard"
import { SubscriptionClient } from "subscriptions-transport-ws"

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

const TeaserPage = () => (
  <Provider value={client}>
    <Layout>
      <SEO title="Speaker Teaser" />
      <h1>Speaker Teaser</h1>
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
            <SpeakerTwitterCard
              contact={data.data.contact}
            />
          </>
        )}
      />
    </Layout>
  </Provider>
)

export default TeaserPage
