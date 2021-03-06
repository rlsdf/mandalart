import express, { Request, Response, NextFunction } from 'express'
import graphqlHTTP from 'express-graphql'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import echo from './routes/echo'
import schema from './schema/schema'
import connectMongoose from './mongodb'

const app = express()
connectMongoose()

const server = new ApolloServer({
  schema,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 10,
    stripFormattedExtensions: false
  },
  engine: false
})
server.applyMiddleware({ app })

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.use('/', echo)

interface Err extends Error {
  status: number
  data?: any
}

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  let err = new Error('Not Found') as Err
  err.status = 404
  next(err)
})

// error handler
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data: err.data
  })
})

export default app
