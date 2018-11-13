import * as graphql from 'graphql'
import * as _ from 'lodash'
import Mandal from '../models/mandal'
import Author from '../models/author'

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql

// dummy data
const mandals = [
  { id: '1', title: 'bag', date: '2018-09-13', authorId: '1' },
  { id: '2', title: 'shoes', date: '2018-10-23', authorId: '2' },
  { id: '3', title: 'wallet', date: '2018-11-11', authorId: '3' },
  { id: '4', title: 'watch', date: '2018-09-13', authorId: '1' },
  { id: '5', title: 'scarf', date: '2018-10-23', authorId: '2' },
  { id: '6', title: 'belt', date: '2018-11-11', authorId: '3' }
]

const authors = [
  { id: '1', name: 'channel' },
  { id: '2', name: 'fendi' },
  { id: '3', name: 'prada' }
]

interface MandalResolveArgs {
  id?: string,
  title?: string,
  date?: string
}

interface AuthorResolveArgs {
  id?: string,
  name?: string
}

const MandalType = new GraphQLObjectType({
  name: 'Mandal',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent: any, args: object) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    mandal: {
      type: new GraphQLList(MandalType),
      resolve (parent: any, args: MandalResolveArgs) {
        return _.filter(mandals, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mandal: {
      type: MandalType,
      args: { id: { type: GraphQLID } },
      resolve (parent: any, args: MandalResolveArgs) {
        return _.find(mandals, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent: any, args: AuthorResolveArgs) {
        return _.find(authors, { id: args.id })
      }
    },
    mandals: {
      type: new GraphQLList(MandalType),
      resolve (parent: any, args: MandalResolveArgs) {
        return mandals
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})
