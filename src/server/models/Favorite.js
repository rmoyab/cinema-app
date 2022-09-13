const { Schema, model } = require('mongoose')

const FavoriteSchema = Schema({
  movieId: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  movieImgPath: {
    type: String,
    required: true,
  },
  saved_at: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

FavoriteSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model('Favorite', FavoriteSchema)
