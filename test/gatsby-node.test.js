/**
 * @jest-environment jsdom
 */
import { graphql } from 'gatsby'
import { createPages } from '../src/gatsby-node.js'

jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  actions: { createRedirect: jest.fn() }
}))

describe('createPages', () => {
  let pluginOptions
  let actions
  let consoleLogSpy

  const markdownQuery = 'allMarkdownRemark'
  const edges = [
    {
      node: {
        fields: { slug: '/post-1' },
        frontmatter: { redirect_from: ['/old-url-1', '/old-url-2'] }
      }
    },
    {
      node: {
        fields: { slug: '/post-2' },
        frontmatter: { redirect_from: ['/old-url-3'] }
      }
    }
  ]

  beforeEach(() => {
    actions = { createRedirect: jest.fn() }
    pluginOptions = { query: 'allMarkdownRemark' }
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.resetAllMocks()
    consoleLogSpy.mockRestore()
  })

  it('should create redirects for each post with a redirect_from field', async () => {
    const data = { q: { edges } }
    graphql.mockReturnValueOnce(Promise.resolve({ data }))
    const createRedirectSpy = jest.spyOn(actions, 'createRedirect')

    await createPages({ graphql, actions }, { query: markdownQuery })

    expect(createRedirectSpy).toHaveBeenCalledTimes(3)
    expect(createRedirectSpy).toHaveBeenCalledWith({
      fromPath: '/old-url-1',
      toPath: '/post-1',
      isPermanent: true,
      redirectInBrowser: true
    })
    expect(createRedirectSpy).toHaveBeenCalledWith({
      fromPath: '/old-url-2',
      toPath: '/post-1',
      isPermanent: true,
      redirectInBrowser: true
    })
    expect(createRedirectSpy).toHaveBeenCalledWith({
      fromPath: '/old-url-3',
      toPath: '/post-2',
      isPermanent: true,
      redirectInBrowser: true
    })

    createRedirectSpy.mockRestore()
  })

  it('should use pluginOptions.query when defined', async () => {
    const customQuery = 'someCustomQuery'
    pluginOptions.query = customQuery

    graphql.mockImplementation((queryString) => {
      expect(queryString).toContain(customQuery)
      return Promise.resolve({ data: { q: { edges: [] } } })
    })

    await createPages({ graphql, actions }, pluginOptions)
  })

  it('should default to allMarkdownRemark when pluginOptions.query is undefined', async () => {
    pluginOptions.query = undefined

    graphql.mockImplementation((queryString) => {
      expect(queryString).toContain('allMarkdownRemark')
      return Promise.resolve({ data: { q: { edges: [] } } })
    })

    await createPages({ graphql, actions }, pluginOptions)
  })

  it('should log a success message when redirects are created', async () => {
    const data = { q: { edges } }
    graphql.mockReturnValueOnce(Promise.resolve({ data }))
    const createRedirectSpy = jest.spyOn(actions, 'createRedirect')

    await createPages({ graphql, actions }, { query: markdownQuery })

    expect(createRedirectSpy).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenCalledWith(
      '%c %s %c %s',
      'color:green',
      'success',
      'color:none',
      'created 3 redirects'
    )
  })

  it('should log an error message when an error occurs', async () => {
    const error = new Error('GraphQL query failed')
    graphql.mockImplementationOnce(() => {
      throw error
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    try {
      await createPages({ graphql, actions }, pluginOptions)
    } catch (error) {
      expect(console.error).toHaveBeenCalledWith('GraphQL query failed')
    }

    consoleSpy.mockRestore()
  })
})
