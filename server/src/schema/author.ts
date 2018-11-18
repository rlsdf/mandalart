import { AuthorResolveArgs } from './interfaces'
import Mandal from '../models/author'

export const typeDef = `
  type Author {
    id: String,
    name: String,
    mandals: [Mandal]
  }
`
export const resolver = {
  Author: {
    mandals (parent: any, args: AuthorResolveArgs) {
      return Mandal.find({ authorId: parent.id })
    }
  }
}
