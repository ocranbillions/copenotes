const getRandomMessageId = (messageIds, MAX_VALUE) => {
  const randomNum = Math.floor(Math.random() * MAX_VALUE) + 1;
  if (messageIds.includes(randomNum)) {
    return getRandomMessageId(messageIds, MAX_VALUE);
  }
  return randomNum;
};

module.exports = { getRandomMessageId };
