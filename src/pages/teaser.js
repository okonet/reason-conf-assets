import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SpeakerTwitterCard from "../components/SpeakerTwitterCard"

const TeaserPage = () => (
    <Layout>
      <SEO title="Speaker Teaser" />
      <h1>Speaker Teaser</h1>
      <Link to="/">Go back to the homepage</Link>
      <StaticQuery
        query={graphql`
          {
            data {
              contact(
                contactName: "Jonathan Siebern"
                conferenceId: "reason-conf-2019"
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
)

export default TeaserPage
