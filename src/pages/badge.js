import React from "react"
import { Link } from "gatsby"
import { File } from "react-figma-primitives"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Badge from "../components/Badge"

const SecondPage = () => (
  <Layout>
    <SEO title="Badge" />
    <h1>Badge</h1>
    <Link to="/">Go back to the homepage</Link>
    <File fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge">
      {() => (
        <Badge
          contact={{
            firstName: "Andrey",
            lastName: "Okonetchnikov",
            company: null,
            type: "Speaker",
            twitter: "@okonetchnikov",
          }}
        />
      )}
    </File>
  </Layout>
)

export default SecondPage
