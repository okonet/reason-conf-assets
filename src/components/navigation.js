import React from "react"
import { Link } from "gatsby"

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/badge">Badge</Link>
        </li>
        <li>
          <Link to="/teaser">Speaker Teaser</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
