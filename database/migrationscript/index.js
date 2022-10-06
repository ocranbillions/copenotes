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
        ('sammiestt@gmail.com', '[1, 3, 4, 9, 10, 6]', false), 
        ('sampleUser@user.com', '[1, 3, 4, 2, 10, 9, 6, 7, 8, 5]', true);
    `,
  );
};

const seedMessagesTable = async () => {
  await db.query(
    `
      INSERT INTO messages 
        (id, title, content)
      VALUES 
        (1, 'New Message - ID1', "We never know the quality of someone else's life, though we seldom resist the temptation to assume and pass judgement."), 
        (2, 'New Message - ID2', "Death twitches my ear;'Live,' he says... 'I'm coming."), 
        (3, 'New Message - ID3', "You lose nothing when fighting for a cause ... In my mind the losers are those who don't have a cause they care about."),
        (4, 'New Message - ID4', "When I let go of what I am, I become what I might be."),
        (5, 'New Message - ID5', "Remake the world, a little at a time, each in your own corner of the world."),
        (6, 'New Message - ID6', "Be with someone who inspires you and makes you be the best version of yourself."),
        (7, 'New Message - ID7', "If we ever forget that we're one nation under God, then we will be one nation gone under."),
        (8, 'New Message - ID8', "For the world is in a bad state, but everything will become still worse unless each of us does his best."),
        (9, 'New Message - ID9', "that as long as we are being remembered, we remain alive."),
        (10, 'New Message - ID10', "Don't let the bastards grind you down.");
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
