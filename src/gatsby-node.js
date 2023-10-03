exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Define the type definitions for the `MarkdownRemark` node
  const typeDefs = `
    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields
      frontmatter: MarkdownRemarkFrontmatter
    }

    type MarkdownRemarkFields {
      slug: String
    }

    type MarkdownRemarkFrontmatter {
      slug: String
    }
  `

  // Create the type definitions
  createTypes(typeDefs)
}

export async function createPages({ graphql, actions }, pluginOptions) {
  const { createRedirect } = actions
  const markdownQuery = pluginOptions.query || 'allMarkdownRemark'

  try {
    const { data } = await graphql(`
      {
        q: ${markdownQuery}(filter: { frontmatter: { redirect_from: { ne: null } } }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                slug
                redirect_from
              }
            }
          }
        }
      }
    `)

    const allPosts = data?.q?.edges

    if (!allPosts || allPosts.length === 0) {
      console.log(
        '%c %s %c %s',
        'color:orange',
        'warning',
        'color:none',
        'no posts with redirect_from found'
      )
      return
    }

    const redirects = []

    allPosts.forEach(({ node }) => {
      let _slug
      const { redirect_from, slug } = node.frontmatter
      if (!slug) _slug = node.fields?.slug
      if (!_slug) {
        console.log(
          '%c %s %c %s',
          'color:orange',
          'warning',
          'color:none',
          'no slug found in frontmatter or fields'
        )
        return
      }

      redirect_from.forEach((from) => {
        redirects.push({ from, to: _slug })
      })
    })

    redirects.forEach(({ from, to }) => {
      createRedirect({
        fromPath: from,
        toPath: to,
        isPermanent: true,
        redirectInBrowser: true
      })
    })
    console.log(
      '%c %s %c %s',
      'color:green',
      'success',
      'color:none',
      `created ${redirects.length} redirects`
    )
  } catch (error) {
    console.error(error.message)
  }
}
