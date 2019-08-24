import { stackLogger } from 'info-logger';
import models from '../models';
import { genreOrder } from '../utils/default';
import { addDataToRedis, getDataFromRedis } from '../redis';

class GenreController {
  /**
   *
   *
   * @static
   * @returns
   * @memberof GenreController
   */
  static async getGenres() {
    try {
      const redisKey = 'book::::genres';
      let bookGenres = await getDataFromRedis(redisKey) || [];

      if (!bookGenres.length) {
        bookGenres = await models.Genre.findAll({
          order: [genreOrder]
        });
        addDataToRedis(redisKey, bookGenres);
      }

      return bookGenres;
    } catch (error) {
      stackLogger(error);
      return error;
    }
  }
}

export default GenreController;
