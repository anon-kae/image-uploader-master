import { OPTIONS_HEADER } from '../utils/constants/globle'
const BASE_API_URL = process.env.BASE_API_URL

export default function (httpService, app, store) {
  return {
    uploadImage (file) {
      const body = new FormData()

      body.append('images-files', file)
      return httpService.post(`${BASE_API_URL}/upload`, body, OPTIONS_HEADER)
    },
  }
}
