import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: String
})

export default mongoose.model('authors', authorSchema)
