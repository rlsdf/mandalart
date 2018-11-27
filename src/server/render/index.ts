import fs from 'fs'
import path from 'path'
import render from './render'

const template = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), {encoding: 'utf-8'})
const renderer = (req, res) => {
  const location = req.path
  const rendered = render(location)
  const page = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)

  res.send(page)
}

export default renderer
