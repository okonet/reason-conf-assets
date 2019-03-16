import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Badge from "../components/Badge"

const SecondPage = () => (
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
            <Badge
              contact={data.data.contact}
            />
        )}
      />
    </Layout>
)

export default SecondPage
