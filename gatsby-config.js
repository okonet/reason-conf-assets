module.exports = {
  siteMetadata: {
    title: "Reason Conf Print Asset Generator",
    description: "Print assets generator for ReasonConf",
    author: "@okonet",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "reason-conf-assets",
        short_name: "assets",
        start_url: "/",
        background_color: "#395672",
        theme_color: "#DD4B39",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "DATA",
        fieldName: "data",
        url: "https://api.react-finland.fi/graphql",
      },
    },
  ],
}
