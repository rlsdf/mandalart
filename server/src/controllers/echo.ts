import { Request, Response } from 'express'

export const echo = (req: Request, res: Response) => {
  res.json(req.query)
}
