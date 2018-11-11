import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './schema/schema'

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.use('/', require('./routes/echo'))

interface Err extends Error {
  status: number
  data?: any
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err = new Error('Not Found') as Err
  err.status = 404
  next(err)
})

// error handler
app.use((err: Err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data: err.data
  })
})

export default app
