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
      <SEO title="Page two" />
      <h1>Assets</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <StaticQuery
        query={graphql`
          query BadgeTemplateQuery {
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
                params: { ids: "1984:0", format: "svg" }
              ) {
                images
              }
              file(id: "HRK5IaLG00uj7oEV2XOg45") {
                pages(name: "Badge") {
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
            <Badge
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

export default SecondPage
