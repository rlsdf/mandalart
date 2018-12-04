import { MandalResolveArgs } from './interfaces'
import Author from '../models/author'

export const typeDef = `
  scalar JSON
  type Mandal {
    id: String,
    goal: String,
    mainSteps: JSON,
    author: Author
  }
`
export const resolver = {
  Mandal: {
    author (parent: any, args: MandalResolveArgs) {
      return Author.findById(parent.authorId)
    }
  }
}
