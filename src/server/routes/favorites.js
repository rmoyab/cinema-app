const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {
  getFavorites,
  createFavorite,
  deleteFavorite,
} = require('../controllers/favorites')

const { jwtValidator } = require('../middlewares/jwt-validator')

const {
  fieldValidator,
  fieldsValidator,
} = require('../middlewares/fields-validator')
const { isDate } = require('../helpers/isDate')

router.use(jwtValidator)

router.get('/', getFavorites)

router.post(
  '/new',
  [
    check('movieId', 'Id is required').not().isEmpty(),
    check('movieTitle', 'Title is required').not().isEmpty(),
    check('movieImgPath', 'Path is required').not().isEmpty(),
    check('saved_at', 'Saved at Date is required').custom(isDate),
    fieldsValidator,
  ],
  createFavorite
)

router.delete('/:id', deleteFavorite)

module.exports = router
