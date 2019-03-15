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
          query SpeakerTweetTemplateQuery {
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
            figma {
              image(
                id: "HRK5IaLG00uj7oEV2XOg45"
                params: { ids: ["2007:306", "1923:27"], format: "svg" }
              ) {
                images
              }
              file(id: "HRK5IaLG00uj7oEV2XOg45") {
                pages(name: "Speaker Teaser") {
                  name
                  frames {
                    size {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <SpeakerTwitterCard
              contact={data.data.contact}
              theme={data.figma.file.pages[0].frames[0]}
              images={data.figma.image.images}
            />
          </>
        )}
      />
    </Layout>
  </Provider>
)

export default TeaserPage
