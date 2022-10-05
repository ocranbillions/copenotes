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

  static async addToReceivedMessages(user, messageId, TOTAL_MESSAGES) {
    const messagesReceived = user.messagesReceived
      ? [messageId, ...JSON.parse(user.messagesReceived)] : [messageId];

    const hasReceivedAllMessages = messagesReceived.length === TOTAL_MESSAGES ? 1 : 0;
    const result = await db.query(
      `
      UPDATE
        users
      SET
        messagesReceived = '${JSON.stringify(messagesReceived)}',
        hasReceivedAllMessages = '${hasReceivedAllMessages}'
      WHERE
        id = '${user.id}'
      `,
    );
    return result;
  }
}

module.exports = User;
