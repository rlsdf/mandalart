import { Request, Response } from 'express'
import render from '../render'

const main = (req: Request, res: Response) => {
  render(req, res)
}

export default main
