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

  beforeEach(() => {
    actions = { createRedirect: jest.fn() }
    pluginOptions = { query: 'allMarkdownRemark' }
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.resetAllMocks()
    consoleLogSpy.mockRestore()
  })

  it('should create redirects correctly', async () => {
    graphql.mockReturnValueOnce(
      Promise.resolve({
        data: {
          q: {
            edges: [
              {
                node: {
                  fields: { slug: '/post-1/' },
                  frontmatter: { redirect_from: ['/old-url-1', '/old-url-2'] }
                }
              }
            ]
          }
        }
      })
    )

    await createPages({ graphql, actions }, pluginOptions)

    expect(actions.createRedirect).toHaveBeenCalledTimes(2)
    expect(actions.createRedirect).toHaveBeenCalledWith({
      fromPath: '/old-url-1',
      toPath: '/post-1/',
      isPermanent: true,
      redirectInBrowser: true
    })
    expect(actions.createRedirect).toHaveBeenCalledWith({
      fromPath: '/old-url-2',
      toPath: '/post-1/',
      isPermanent: true,
      redirectInBrowser: true
    })
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

  it('should log and reject errors when the GraphQL query fails', async () => {
    graphql.mockReturnValueOnce(
      Promise.resolve({ errors: [{ message: 'GraphQL error' }] })
    )

    try {
      await createPages({ graphql, actions }, pluginOptions)
    } catch (error) {
      expect(console.log).toHaveBeenCalledWith([{ message: 'GraphQL error' }])
      expect(error).toEqual([{ message: 'GraphQL error' }])
    }
  })
})
