import { dbQuery } from '../driver';
import BaseRepository from '.';

class UserRepository extends BaseRepository {
  constructor() {
    super('Users');
  }

  async getAllUsers(findQuery) {
    let query = `
      SELECT "${this.model}".*
      FROM "${this.model}"
      ORDER BY id ASC
      WHERE "deletedAt" IS NULL
    `;

    const fields = Object.keys(findQuery);
    const values = Object.values(findQuery);

    fields.forEach((field, index) => {
      query = `${query} AND "${field}" = $${index + 1}`;
    });

    const queryConfig = {
      text: query,
      values,
    };

    try {
      const result = await dbQuery(queryConfig);
      return result.rows;
    } catch (error) {
      return error;
    }
  }
}

export default UserRepository;