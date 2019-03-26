/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react"
import { Provider } from "react-figma-primitives"

export function wrapRootElement({ element }, {}) {
  return (
    <Provider host="http://localhost:3001" wsHost="ws://localhost:3001">
      {element}
    </Provider>
  )
}
