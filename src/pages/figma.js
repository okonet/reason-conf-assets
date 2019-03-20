import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Badge from "../components/Badge"
import FigmaFile from "../components/FigmaFile"

const FigmaPage = () => (
  <Layout>
    <SEO title="Badge" />
    <h1>Figma File API Test</h1>
    <Link to="/">Go back to the homepage</Link>
    <FigmaFile fileId="HRK5IaLG00uj7oEV2XOg45">
      {({ data }) => <h2>{data.file.lastModified}</h2>}
    </FigmaFile>
  </Layout>
)

export default FigmaPage
