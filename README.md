[![gatsby-redirect-from](https://raw.githubusercontent.com/kremalicious/gatsby-redirect-from/main/src/gatsby-redirect-from.png)](https://kremalicious.com/gatsby-redirect-from/)

# gatsby-redirect-from

[![npm package](https://img.shields.io/npm/v/gatsby-redirect-from.svg)](https://www.npmjs.com/package/gatsby-redirect-from)
[![Build Status](https://github.com/kremalicious/gatsby-redirect-from/workflows/CI/badge.svg)](https://github.com/kremalicious/gatsby-redirect-from/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9643b2a038a7d338a73a/maintainability)](https://codeclimate.com/github/kremalicious/gatsby-redirect-from/maintainability)

> 🎯 Set redirect urls in your YAML frontmatter within your [Gatsby](https://www.gatsbyjs.org) site's Markdown files. Mimics the behavior of [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from).
> https://kremalicious.com/gatsby-redirect-from/

By adding a `redirect_from` list of URLs to your Markdown file's YAML frontmatter, this plugin creates client-side redirects for all of them at build time, with Gatsby's [`createRedirect`](https://www.gatsbyjs.org/docs/actions/#createRedirect) used under the hood.

By combining this plugin with [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect), you get simple server-side redirects from your `redirect_from` lists out of the box. You can also combine it with any other plugin picking up Gatsby `createRedirect` calls to get [proper SEO-friendly server-side redirects](https://kremalicious.com/gatsby-redirect-from/#server-side-redirects) for your hosting provider.

---

**Table of Contents**

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Plugin Development](#plugin-development)
- [Changelog](#changelog)
- [License](#license)

---

## Prerequisites

- Gatsby v2
- Markdown files delivered from [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
- `slug` on `allMarkdownRemark.edges.node.fields`

## Installation

```bash
cd yourproject/
npm i gatsby-redirect-from gatsby-plugin-meta-redirect
```

Then load the plugin along with e.g. [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect) from your `gatsby-config.js`:

```js
plugins: [
  'gatsby-redirect-from',
  'gatsby-plugin-meta-redirect' // make sure this is always the last one
]
```

That's it.

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
  # note: trailing slashes are required
---

```

## [Documentation](https://kremalicious.com/gatsby-redirect-from/)

More explanations and options, all about server-side redirects, and additional plugins which can be used in combination with gatsby-redirect-from.

- **[Documentation →](https://kremalicious.com/gatsby-redirect-from/)**

## Plugin Development

```bash
npm i
npm start

# production build
npm run build

# publishing to npm & GitHub releases
# uses https://github.com/webpro/release-it
npm run release
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

The MIT License

Copyright (c) 2020 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Made with ♥ by [Matthias Kretschmann](https://matthiaskretschmann.com) ([@kremalicious](https://github.com/kremalicious))

Say thanks with BTC:
`35UUssHexVK48jbiSgTxa4QihEoCqrwCTG`

Say thanks with ETH:
`0x04354F554536DA108726829207958d3E277f0210`
