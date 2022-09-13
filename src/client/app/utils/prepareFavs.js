import moment from 'moment'

export const prepareFavs = (favorites = []) => {
  return favorites.map(f => ({
    ...f,
    saved_at: moment(f.saved_at).toDate(),
  }))
}
