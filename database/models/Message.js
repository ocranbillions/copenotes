const db = require('../index');

class Message {
  // constructor() {}

  static async getAll() {
    const result = await db.query(
      `
        SELECT
          *
        FROM
          messages;
      `,
    );
    return result;
  }

  static async getMessageById(id) {
    const result = await db.query(`
        SELECT
          *
        FROM
          messages
        WHERE
          id = ?;
      `, [id]);
    return result;
  }
}

module.exports = Message;
