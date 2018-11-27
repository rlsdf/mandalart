import mongoose from 'mongoose'

const db = mongoose.connection

db.on('error', (): void => console.error('mongodb connection error!!'))

db.once('open', (): void => console.log('Connected to mongod server'))

export default () => mongoose.connect('mongodb://localhost/mandalart')
  .then((): void => {
    console.log('successfully connected to mongo')
  })
  .catch((err): void => {
    console.log(err)
  })
