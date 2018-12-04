import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mandalSchema = new Schema({
  goal: String,
  mainSteps: Object,
  authorId: String
})

export default mongoose.model('mandals', mandalSchema)
