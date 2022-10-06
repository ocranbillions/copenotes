const getRandomMessageId = (messagesReceived, MAX_VALUE) => {
  const randomNum = Math.floor(Math.random() * MAX_VALUE) + 1;
  if (messagesReceived.includes(randomNum)) {
    return getRandomMessageId(messagesReceived, MAX_VALUE);
  }
  return randomNum;
};

module.exports = { getRandomMessageId };
