import { makeExecutableSchema } from 'graphql-tools'
import { MandalResolveArgs, AuthorResolveArgs } from './interfaces'
import Mandal from '../models/mandal'
import Author from '../models/author'
import { typeDef as MandalType, resolver as MandalResolver } from './mandal'
import { typeDef as AuthorType, resolver as AuthorResolver } from './author'

const QueryType = `
  type Query {
    mandal(id: String!): Mandal
    author(id: String!): Author
    mandals: [Mandal]
    authors: [Author]
  }
`
const MutationType = `
  type Mutation {
    addAuthor(name: String!): Author
    addMandal(title: String!, date: String!, authorId: String): Mandal
  }
`

const resolvers = {
  Query: {
    mandal (parent: any, args: MandalResolveArgs) {
      return Mandal.findById(args.id)
    },
    author (parent: any, args: AuthorResolveArgs) {
      return Author.find(args.id)
    },
    mandals (parent: any, args: MandalResolveArgs) {
      return Mandal.find({})
    },
    authors (parent: any, args: AuthorResolveArgs) {
      return Author.find({})
    }
  },
  Mutation: {
    addAuthor (parent: any, args: AuthorResolveArgs) {
      let author = new Author({
        name: args.name
      })

      return author.save()
    },
    addMandal (parent: any, args: MandalResolveArgs) {
      let mandal = new Mandal({
        title: args.title,
        date: args.date,
        authorId: args.authorId
      })

      return mandal.save()
    }
  }
}

export default makeExecutableSchema({
  typeDefs: [ QueryType, MutationType, MandalType, AuthorType ],
  resolvers: {
    ...resolvers,
    ...MandalResolver,
    ...AuthorResolver
  }
})

// dummy data
// const mandals = [
//   { id: '1', title: 'bag', date: '2018-09-13', authorId: '1' },
//   { id: '2', title: 'shoes', date: '2018-10-23', authorId: '2' },
//   { id: '3', title: 'wallet', date: '2018-11-11', authorId: '3' },
//   { id: '4', title: 'watch', date: '2018-09-13', authorId: '1' },
//   { id: '5', title: 'scarf', date: '2018-10-23', authorId: '2' },
//   { id: '6', title: 'belt', date: '2018-11-11', authorId: '3' }
// ]

// const authors = [
//   { id: '1', name: 'channel' },
//   { id: '2', name: 'fendi' },
//   { id: '3', name: 'prada' }
// ]

// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     mandal: {
//       type: new GraphQLList(MandalType),
//       resolve (parent: any, args: MandalResolveArgs) {
//         return _.filter(mandals, { authorId: parent.id })
//       }
//     }
//   })
// })
