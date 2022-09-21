const { response } = require('express')
const Favorite = require('../models/Favorite')

const getFavorites = async (req, res = response) => {
  const uid = req.uid
  const favorites = await Favorite.find({ user: { _id: uid } }).populate(
    'user',
    'name'
  )

  res.json({
    ok: true,
    favorites,
  })
}

const createFavorite = async (req, res = response) => {
  const id = req.body.movieId
  const uid = req.uid
  const findMovieId = await Favorite.find({ movieId: id, user: { _id: uid } })

  if (findMovieId.length > 0) {
    return res.status(500).json({
      ok: false,
      msg: 'The selected item is already in favorites',
    })
  }

  const favorite = new Favorite(req.body)

  try {
    favorite.user = req.uid
    const savedFavorite = await favorite.save()
    res.status(201).json({
      ok: true,
      favorite: savedFavorite,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error at create new favorite',
    })
  }
}

const deleteFavorite = async (req, res = response) => {
  const favoriteId = req.params.id

  try {
    const favorite = await Favorite.findById(favoriteId)

    if (!favorite) {
      return res.status(404).json({
        ok: false,
        msg: 'Error, favorite not found',
      })
    }

    await Favorite.findByIdAndDelete(favoriteId)

    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error at delete favorite',
    })
  }
}

module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
}
