import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const mandalSchema = new Schema({
  title: String,
  date: String,
  authorId: String
})

export default mongoose.model('mandals', mandalSchema)
