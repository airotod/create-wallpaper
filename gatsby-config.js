module.exports = {
  pathPrefix: `/create-wallpaper`,
  siteMetadata: {
    title: `create wallpaper`,
    description: `Feel free to make your own wallpaper`,
    author: `Sngii`,
    siteUrl: `https://airotod.github.io/create-wallpaper`,
    image: `/eyes.png`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `DM Serif Display`,
            variants: [`400`],
          },
          {
            family: `Merriweather`,
            variants: [`400`],
          },
          {
            family: `Roboto`,
            variants: [`400`],
          },
        ],
      },
    },
  ],
}
