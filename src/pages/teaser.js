import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Stack from "stack-styled"
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
            conference(id: "reason-conf-2019") {
              id
              speakers {
                name
                company
                image {
                  url
                }
                talks {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Stack gap={4}>
          {data.data.conference.speakers.map(speaker => (
            <SpeakerTwitterCard contact={speaker} key={speaker.name} />
          ))}
        </Stack>
      )}
    />
  </Layout>
)

export default TeaserPage
