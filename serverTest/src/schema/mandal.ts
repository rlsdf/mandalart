import { MandalResolveArgs } from './interfaces'
import Author from '../models/author'

export const typeDef = `
  type Mandal {
    id: String,
    title: String,
    date: String,
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
