import chalk from 'chalk'

export function createPages({ graphql, actions }) {
  const { createRedirect } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: { frontmatter: { redirect_from: { ne: null } } }
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    redirect_from
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        const allPosts = result.data.allMarkdownRemark.edges

        const redirects = []

        // For all posts with redirect_from frontmatter,
        // extract all values and push to redirects array
        allPosts.forEach(post => {
          redirects.push({
            from: post.node.frontmatter.redirect_from,
            to: post.node.fields.slug
          })
        })

        const createRedirectTemplate = (from, to) => {
          createRedirect({
            fromPath: from,
            toPath: to,
            isPermanent: true,
            redirectInBrowser: true
          })
        }

        // Create redirects from the just constructed array
        redirects.forEach(({ from, to }) => {
          // `from` is a string when only a single value is set
          if (typeof 'string' === from) {
            createRedirectTemplate(from, to)
          }
          // otherwise `from` is a list array
          else {
            // iterate through all `from` array items
            from.forEach(from => {
              createRedirectTemplate(from, to)
            })
          }
        })

        resolve(
          console.log(`${chalk.green('success')} create redirects`) // eslint-disable-line no-console
        )
      })
    )
  })
}
