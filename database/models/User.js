const db = require('../index');

class User {
  // constructor() {}

  static async create(email) {
    const result = await db.query(
      `INSERT INTO users (email, messagesReceived, hasReceivedAllMessages)
        VALUES ('${email.trim().toLowerCase()}', '[]', 0)
      `,
    );

    return result;
  }

  static async find(email) {
    const result = await db.query(
      `
        SELECT
          *
        FROM
          users
        WHERE
          email = '${email.trim().toLowerCase()}';
      `,
    );
    return result;
  }

  static async getAllUsersWhoShouldStillReceiveMessages() {
    const result = await db.query(
      `
        SELECT
          *
        FROM
          users
        WHERE
        hasReceivedAllMessages = false;
      `,
    );
    return result;
  }

  static async addToReceivedMessages(userId, updatedMessageIds, hasReceivedAllMessages) {
    const result = await db.query(
      `
      UPDATE
        users
      SET
        messagesReceived = '${JSON.stringify(updatedMessageIds)}',
        hasReceivedAllMessages = '${hasReceivedAllMessages}'
      WHERE
        id = '${userId}'
      `,
    );
    return result;
  }
}

module.exports = User;
