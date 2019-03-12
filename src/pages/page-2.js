import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SpeakerTwitterCard from "../components/SpeakerTwitterCard"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Assets</h1>
    <p>Welcome to page 2</p>
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
            file(id: "HRK5IaLG00uj7oEV2XOg45") {
              pages(name: "Badge") {
                name
                frames {
                  name
                  position {
                    x
                    y
                  }
                  size {
                    width
                    height
                  }
                  elements(type: "TEXT", name: "firstName") {
                    name
                    position {
                      x
                      y
                    }
                    size {
                      width
                      height
                    }
                    style {
                      fontSize
                      fontFamily
                      fontWeight
                      letterSpacing
                    }
                    fill {
                      r
                      g
                      b
                      a
                    }
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
          />
        </>
      )}
    />
  </Layout>
)

export default SecondPage
