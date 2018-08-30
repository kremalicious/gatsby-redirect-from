# gatsby-redirect-from

[![npm package](https://img.shields.io/npm/v/gatsby-redirect-from.svg)](https://www.npmjs.com/package/gatsby-redirect-from)
[![Build Status](https://travis-ci.com/kremalicious/gatsby-redirect-from.svg?branch=master)](https://travis-ci.com/kremalicious/gatsby-redirect-from)
[![Maintainability](https://api.codeclimate.com/v1/badges/9643b2a038a7d338a73a/maintainability)](https://codeclimate.com/github/kremalicious/gatsby-redirect-from/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/kremalicious/gatsby-redirect-from.svg)](https://greenkeeper.io/)

> 🎯 Set redirect urls in your YAML frontmatter within your [Gatsby](https://www.gatsbyjs.org) site's Markdown files. Mimics the behavior of [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from).

By adding a list of urls to the YAML frontmatter, this plugin creates redirects for all of them at build time. It uses Gatsby's [createRedirect](https://next.gatsbyjs.org/docs/actions/#createRedirect) under the hood.

## Table of Contents

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Plugin Development](#plugin-development)
  - [License](#license)

---

## Prerequisites

- Gatsby v2
- Markdown files delivered from [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
- `slug` on `allMarkdownRemark.edges.node.fields`

Plugin assumes the default setup from [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), with Markdown files processing by [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) and adding a field `slug` for each file node. Head over to gatsby-starter-blog's [gatsby-node.js](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js#L57) file to see how this is done.

## Installation

```bash
cd yourproject/
npm i gatsby-redirect-from
```

Then load the plugin from your `gatsby-config.js`:

```js
plugins: ['gatsby-redirect-from']
```

## Usage

In your Markdown file's YAML frontmatter, use the key `redirect_from` followed by a list:

```yaml
---
title: Aperture File Types
redirect_from:
  - /new-goodies-aperture-file-types-icons/
  - /goodie-updated-aperture-file-types-v11/
  - /aperture-file-types-v12-released/
  - /2008/04/aperture-file-types/
  # note: forward slashes are required
---
```

## Plugin Development

```bash
npm i
npm start

# production build
npm run build

# publishing to npm & GitHub releases
# uses https://github.com/webpro/release-it
npm run release
npm run release-minor
npm run release-major
```

## License

The MIT License

Copyright (c) 2018 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Made with ♥ by [Matthias Kretschmann](https://matthiaskretschmann.com) ([@kremalicious](https://github.com/kremalicious))

Say thanks with BTC:
`35UUssHexVK48jbiSgTxa4QihEoCqrwCTG`

Say thanks with ETH:
`0x04354F554536DA108726829207958d3E277f0210`
