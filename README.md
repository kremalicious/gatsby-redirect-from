# gatsby-redirect-from

> Set redirect urls in your YAML frontmatter within your [Gatsby](https://www.gatsbyjs.org) site's Markdown files. Mimics the behavior of [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from).

By adding a list of urls to the YAML frontmatter, this plugin creates redirects for all of them at build time. It uses Gatsby's [createRedirect](https://next.gatsbyjs.org/docs/actions/#createRedirect) under the hood.

## Prerequisites

- Gatsby v2
- only parses Markdown files delivered from [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
- `slug` on `fields`

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
  # forward slashes are required
  - /new-goodies-aperture-file-types-icons/
  - /goodie-updated-aperture-file-types-v11/
  - /aperture-file-types-v12-released/
  - /2008/04/aperture-file-types/
---
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
