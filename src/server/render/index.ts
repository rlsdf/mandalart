/** 서버사이드 렌더링 미들웨어 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
// import fetch from 'node-fetch'
import render from './render'

// const endpoint = 'http://localhost:9999/graphql'
// const query = `{
//   mandals {
//     goal
//     mainSteps
//   }
// }`

const template = fs.readFileSync(
  path.join(__dirname, '../../public/index.html'),
  { encoding: 'utf-8' }
)

const renderer = async (req: Request, res: Response) => {
  const location = req.path
  const { html, state } = await render(location)
  const page = template.replace('<div id="root"></div>',
  `<div id="root">${html}</div>
    <script>window.__PRELOADED_STATE__=${JSON.stringify(state)}</script>`
  )

  res.send(page)

  // if (location === '/') {
  //   fetch(
  //     endpoint,
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ query })
  //     }
  //   )
  //   .then(res => res.json())
  //   .then((json: any) => {
  //     const rendered = render(location, JSON.stringify(json.data))
  //     const page = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)

  //     res.send(page)
  //   })
  // }
}

export default renderer
