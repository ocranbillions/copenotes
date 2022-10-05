const getRandomMessageId = (user, MAX_VALUE) => {
  const messagesReceived = user.messagesReceived ? [...JSON.parse(user.messagesReceived)] : [];

  const randomNum = Math.floor(Math.random() * MAX_VALUE) + 1;
  if (messagesReceived.includes(randomNum)) {
    return getRandomMessageId(user, MAX_VALUE);
  }
  return randomNum;
};

module.exports = { getRandomMessageId };
