import { dbQuery } from '..';
import logger from '../../utils/initLogger';

export const createGenreTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS
      "Genres" (
        id varchar(128) PRIMARY KEY NOT NULL,
        genre varchar(255) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "deletedAt" TIMESTAMP
      );
  `;

  const queryConfig = {
    text: query,
  };

  try {
    await dbQuery(queryConfig);
  } catch (error) {
    logger.info(error);
  }
};

export const dropGenreTable = async () => {
  const query = `
    DROP TABLE IF EXISTS "Genres";
  `;

  const queryConfig = {
    text: query,
  };

  try {
    await dbQuery(queryConfig);
  } catch (error) {
    logger.info(error);
  }
};