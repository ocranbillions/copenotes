const MESSAGES_TABLE = [
  {
    id: 1,
    title: 'Title1',
    content: 'message1',
  },
  {
    id: 2,
    title: 'Title2',
    content: 'message2',
  },
  {
    id: 3,
    title: 'Title3',
    content: 'message3',
  },
  {
    id: 4,
    title: 'Title4',
    content: 'message4',
  },
  {
    id: 5,
    title: 'Title5',
    content: 'message5',
  },
  {
    id: 6,
    title: 'Title6',
    content: 'message6',
  },
  {
    id: 7,
    title: 'Title7',
    content: 'message7',
  },
  {
    id: 8,
    title: 'Title8',
    content: 'message8',
  },
  {
    id: 9,
    title: 'Title9',
    content: 'message9',
  },
  {
    id: 10,
    title: 'Title10',
    content: 'message10',
  },
];

const SUBSCRIBERS_TABLE = [
  {
    email: 'ocran.aws@gmail.com',
    hasReceivedAllMessages: false,
    messagesReceived: [1, 3, 4, 9, 10, 6],
  },
  {
    email: 'random@user.com',
    hasReceivedAllMessages: true,
    messagesReceived: [1, 3, 4, 2, 10, 9, 6, 7, 8, 5],
  },
  {
    email: 'sammiestt@gmail.com',
    hasReceivedAllMessages: false,
    messagesReceived: [],
  },
];

const addToSubscribers = (email) => new Promise((resolve) => {
  const userObject = {
    email,
    hasReceivedAllMessages: false,
    messagesReceived: [],
  };

  SUBSCRIBERS_TABLE.push(userObject);
  resolve(userObject);
});

const getAllUsersWhoShouldStillReceiveMessages = () => new Promise((resolve) => {
  const users = SUBSCRIBERS_TABLE.filter((user) => !user.hasReceivedAllMessages);
  resolve(users);
});

const getMessageById = (id) => new Promise((resolve) => {
  const message = MESSAGES_TABLE.filter((m) => m.id === id);
  resolve(message);
});

const getAllMessages = () => new Promise((resolve) => {
  resolve(MESSAGES_TABLE);
});

const updateUserRecord = (userEmail, messageId) => new Promise((resolve) => {
  const user = SUBSCRIBERS_TABLE.find((u) => u.email === userEmail);
  user.messagesReceived.push(messageId);
  if (user.messagesReceived.length === MESSAGES_TABLE.length) {
    user.hasReceivedAllMessages = true;
  }
  resolve(user);
});

const getUserByEmail = (email) => new Promise((resolve) => {
  const user = SUBSCRIBERS_TABLE.find((u) => u.email === email);
  resolve(user);
});

module.exports = {
  addToSubscribers,
  getAllUsersWhoShouldStillReceiveMessages,
  getMessageById,
  getAllMessages,
  updateUserRecord,
  getUserByEmail,
};
