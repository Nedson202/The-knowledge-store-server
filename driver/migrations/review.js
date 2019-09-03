import { dbQuery } from '..';
import logger from '../../utils/initLogger';

export const createReviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS
      "Reviews" (
        id varchar(128) PRIMARY KEY NOT NULL,
        review TEXT NOT NULL,
        rating FLOAT DEFAULT 0,
        likes INTEGER DEFAULT 0,
        "userId" varchar(128) REFERENCES "Users"(id),
        "bookId" varchar(128) REFERENCES "Books"(id),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
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

export const dropReviewTable = async () => {
  const query = `
    DROP TABLE IF EXISTS "Reviews";
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
