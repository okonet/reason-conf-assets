import React from "react"
import { Link } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { chunk, flatten, take } from "lodash"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Badge from "../components/Badge"
import Dropzone from "../components/Dropzone"
import { File } from "react-figma-primitives"

const badgesPerPage = 4 // Should be even!

const PageStyles = createGlobalStyle`
  @page {
    size: A4;
    //margin-top: 1cm;
  }
`

const Sheet = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin-bottom: 5mm;
  width: 210mm;
  height: 296mm;
  box-sizing: border-box;
  //height: 11.5in !important; // Adjust for Safari print mode

  @media screen {
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);
  }

  @media print {
    break-before: page;
    break-after: page;
    -webkit-print-color-adjust: exact;
  }
`

// To render badges from 2 sides we need to change the order of them on pages
const SplitPage = ({ tickets }) => {
  const pairs = chunk(tickets, 2)
  const reverse = flatten(pairs.map(pair => [pair[1], pair[0]]))

  return (
    <>
      <Sheet>
        {tickets.map((ticket, idx) => (
          <Badge contact={ticket} key={"front-" + idx} />
        ))}
      </Sheet>
      <Sheet>
        {reverse.map((ticket, idx) => (
          <Badge contact={ticket} key={"back-" + idx} />
        ))}
      </Sheet>
    </>
  )
}

export default function Badges() {
  return (
    <Layout>
      <SEO title="Badges Generator" />
      <h1>Badges Generator</h1>
      <Link to="/">Go back to the homepage</Link>
      <PageStyles />
      <Dropzone name="tickets" multiple={false} accept={"text/csv"}>
        {({ tickets }) => (
          <File fileId="HRK5IaLG00uj7oEV2XOg45" pageName="Badge">
            {() =>
              chunk(tickets, badgesPerPage).map((pageTickets, idx) => (
                <SplitPage tickets={pageTickets} key={idx} />
              ))
            }
          </File>
        )}
      </Dropzone>
    </Layout>
  )
}
