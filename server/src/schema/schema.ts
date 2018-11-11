// import * as graphql from 'graphql'
import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import * as _ from 'lodash'

// dummy data
const mandals = [
  { id: '1', title: 'exercise', date: '2018-09-13' },
  { id: '2', title: 'art', date: '2018-10-23' },
  { id: '3', title: 'car', date: '2018-11-11' }
]

interface MandalResolveArgs {
  id?: string,
  title?: string,
  date?: string
}

const MandalType = new GraphQLObjectType({
  name: 'Mandal',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    date: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mandal: {
      type: MandalType,
      args: { id: { type: GraphQLString } },
      resolve (parent: any, args: MandalResolveArgs) {
        return _.find(mandals, { id: args.id })
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})
