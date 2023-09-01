import * as Loader from '@mapbox/mbtiles'

export const loadMbtile = (path: string) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-new
  new Loader(path, (err, mbtiles) => {
    if (err) {
      reject(err)
    } else {
      resolve(mbtiles)
    }
  })
})
