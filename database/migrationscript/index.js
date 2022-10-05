const db = require('../index');

const createUserTable = async () => {
  await db.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100),
      messagesReceived TEXT,
      hasReceivedAllMessages BOOLEAN,
      UNIQUE (email)
    ) ENGINE=InnoDB;
    `,
  );
};

const createMessageTable = async () => {
  await db.query(
    `CREATE TABLE IF NOT EXISTS messages (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100),
      content LONGTEXT
    ) ENGINE=InnoDB;
    `,
  );
};

const seedUsersTable = async () => {
  await db.query(
    `
      INSERT INTO users 
        (email, messagesReceived, hasReceivedAllMessages)
      VALUES 
        ('ocran.aws@gmail.com', '[1, 3, 4, 9, 10, 6]', false), 
        ('test@user.com', '[1, 3, 4, 2, 10, 9, 6, 7, 8, 5]', true);
    `,
  );
};

const seedMessagesTable = async () => {
  await db.query(
    `
      INSERT INTO messages 
        (id, title, content)
      VALUES 
        (1, 'Title1', 'message1'), 
        (2, 'Title2', 'message2'), 
        (3, 'Title3', 'message3'),
        (4, 'Title4', 'message4'),
        (5, 'Title5', 'message5'),
        (6, 'Title6', 'message6'),
        (7, 'Title7', 'message7'),
        (8, 'Title8', 'message8'),
        (9, 'Title9', 'message9'),
        (10, 'Title10', 'message10');
    `,
  );
};

(async () => {
  try {
    await createUserTable();
    await createMessageTable();
    await seedUsersTable();
    await seedMessagesTable();
  } catch (error) {
    console.log(error.message);
  }

  process.exit();
})();
